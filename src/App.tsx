import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked';
import 'highlight.js/styles/tokyo-night-dark.css';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import './App.css'

function App() {
  const [markdownContent, setMarkdownContent] = useState('# Hello there');
  const [parsedHTML, setParsedHTML] = useState<string>(marked.parse(markdownContent) as string);
  const timerRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setParsedHTML(marked.parse(markdownContent) as string), 300)
    return () => { 
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    }
  }, [markdownContent]);

  return (
    <div className='markdown-editor__container'>
      <Toolbar />
      <div className='markdown-editor__container-edit-preview'>
        <MarkdownEditor value={markdownContent} onChange={handleChange} />
        <Preview html={parsedHTML} />
      </div>
    </div>
  )
}

export default App
