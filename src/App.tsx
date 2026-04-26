import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked';
import { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import type { Session } from '@supabase/supabase-js';
import type { SaveStatus, MarkdownDocument, Folder } from './types';
import 'highlight.js/styles/tokyo-night-dark.css';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import SideBar from './components/Sidebar';
import Auth from './components/Auth';
import { supabase } from './supabaseClient';
import './App.css'

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [documents, setDocuments] = useState<MarkdownDocument[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeDocument, setActiveDocument] = useState<MarkdownDocument | null>(null);
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
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });
      if (data && data.length > 0) {
        setDocuments(data);
        setActiveDocument(data[0]);
      } else {
        // no documents yet - todo: create a first doc here later
      }
    };
    loadDocument();
  }, [session]);

  const saveContent = async () => {
    if (!session || !activeDocument) return;
    setSaveStatus('saving');

    await supabase
      .from('documents')
      .upsert( 
        { id: activeDocument.id, user_id: session.user.id, content: activeDocument.content, updated_at: new Date().toISOString() }, 
        { onConflict: 'id' }
      );

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleChange = (value: string) => {
    if (!activeDocument) return;
    const updated = { ...activeDocument, content: value };
    setActiveDocument(updated);
    setDocuments(docs => docs.map(d => d.id === updated.id ? updated : d));
  }

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
    timerRef.current = setTimeout(() => setParsedHTML(marked.parse(activeDocument?.content ?? '') as string), 300);
    return () => { if (timerRef.current !== null) clearTimeout(timerRef.current); };
  }, [activeDocument?.content]);

  useEffect(() => {
    if (!session) return;
    if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(saveContent, 2000);
    return () => { if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current); };
  }, [activeDocument?.content]);

  if (!session) return <Auth />;

  return (
    <>
      <div className='bg-[#121212]'>
        <Toolbar onClick={handleToolbarAction} onSave={saveContent} saveStatus={saveStatus} />
      </div>
      <div className='flex h-screen'>
        <div className='sidebar-component bg-[#1E1E1E]'>
          <SideBar
            documents={documents}
            activeDocument={activeDocument}
            onSelectDocument={setActiveDocument}
          />
        </div>
        <div className='w-1/2 h-full bg-[#0d0d0d] px-[40px] py-[40px]'>
          <MarkdownEditor ref={editorRef} value={activeDocument?.content ?? ''} onChange={handleChange} />
        </div>
        <div className='w-1/2 h-full bg-[#121212] px-[40px] py-[40px]'>
          <Preview html={parsedHTML} />
        </div>
      </div>
    </>
  )
}

export default App
