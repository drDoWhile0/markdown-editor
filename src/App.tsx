import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked';
import { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import type { Session } from '@supabase/supabase-js';
import type { SaveStatus } from './types';
import 'highlight.js/styles/tokyo-night-dark.css';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import Auth from './components/Auth';
import { supabase } from './supabaseClient';
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [parsedHTML, setParsedHTML] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const timerRef = useRef<number | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    const loadDocument = async () => {
      const { data } = await supabase
        .from('documents')
        .select('content')
        .eq('user_id', session.user.id)
        .single();
      if (markdownContent === '') {
        setMarkdownContent(data?.content ?? '# Hello there');
      }
    };
    loadDocument();
  }, [session]);

  const saveContent = async () => {
    if (!session) return;
    setSaveStatus('saving');

    await supabase
      .from('documents')
      .upsert( 
        { user_id: session.user.id, content: markdownContent, updated_at: new Date().toISOString() }, 
        { onConflict: 'user_id' }
      );

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleChange = (value: string) => setMarkdownContent(value);

  const handleToolbarAction = (syntax: string) => {
    const view = editorRef.current?.view;
    if (!view) return;
    const { from, to } = view.state.selection.main;
    const selectedText = view.state.sliceDoc(from, to);
    if (syntax === '```') {
      view.dispatch(view.state.update({ changes: { from, to, insert: '```\n' + selectedText + '\n```' } }));
    } else {
      view.dispatch(view.state.update({ changes: { from, to, insert: syntax + selectedText + syntax } }));
    }
    view.focus();
  };

  useEffect(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setParsedHTML(marked.parse(markdownContent) as string), 300);
    return () => { if (timerRef.current !== null) clearTimeout(timerRef.current); };
  }, [markdownContent]);

  useEffect(() => {
    if (!session) return;
    if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(saveContent, 2000);
    return () => { if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current); };
  }, [markdownContent]);

  if (!session) return <Auth />;

  return (
    <>
      <div className='bg-[#121212]'>
        <Toolbar onClick={handleToolbarAction} onSave={saveContent} saveStatus={saveStatus} />
      </div>
      <div className='flex h-screen'>
        <div className='w-1/2 h-full bg-[#0d0d0d] px-[40px] py-[40px]'>
          <MarkdownEditor ref={editorRef} value={markdownContent} onChange={handleChange} />
        </div>
        <div className='w-1/2 h-full bg-[#121212] px-[40px] py-[40px]'>
          <Preview html={parsedHTML} />
        </div>
      </div>
    </>
  )
}

export default App
