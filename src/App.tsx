import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked';
import { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import 'highlight.js/styles/tokyo-night-dark.css';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import './App.css'

const STORAGE_KEY = 'markdown-content';

function App() {
  const [markdownContent, setMarkdownContent] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? '# Let\'s begin'
  );
  const [parsedHTML, setParsedHTML] = useState<string>(marked.parse(markdownContent) as string);
  const timerRef = useRef<number | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);

  const saveContent = () => {
    localStorage.setItem(STORAGE_KEY, markdownContent);
  }

  const handleChange = (value: string) => {
    setMarkdownContent(value);
  }

  const handleToolbarAction = (syntax: string) => {
    const view = editorRef.current?.view;
    if (!view) return;

    const { from, to } = view.state.selection.main;
    const selectedText = view.state.sliceDoc(from, to);

    if (syntax === '```') {
      view.dispatch(view.state.update({
        changes: { from, to, insert: '```\n' + selectedText + '\n```' }
      }));
    } else {
      view.dispatch(view.state.update({
        changes: { from, to, insert: syntax + selectedText + syntax }
      }));
    }

    view.focus();
  };

  useEffect(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setParsedHTML(marked.parse(markdownContent) as string), 300);
    return () => { if (timerRef.current !== null) clearTimeout(timerRef.current); }
  }, [markdownContent]);

  useEffect(() => {
    if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(saveContent, 3000);
    return () => { if (autosaveTimerRef.current !== null) clearTimeout(autosaveTimerRef.current); }
  }, [markdownContent]);

  return (
    <>
      <div>
        <Toolbar onClick={handleToolbarAction} onSave={saveContent} />
      </div>
      <div>
        <div className='flex h-screen'>
          <div className='w-1/2 h-full bg-[#0d0d0d] px-[40px] py-[40px]'>
            <MarkdownEditor ref={editorRef} value={markdownContent} onChange={handleChange} />
          </div>
          <div className='w-1/2 h-full bg-[#121212] px-[40px] py-[40px]'>
            <Preview html={parsedHTML} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App