import { useState, useRef, useEffect } from 'react'
import { marked, use } from 'marked';
import 'highlight.js/styles/tokyo-night-dark.css';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import './App.css'

function App() {
  const [markdownContent, setMarkdownContent] = useState('# Hello there');
  const [parsedHTML, setParsedHTML] = useState<string>(marked.parse(markdownContent) as string);
  const timerRef = useRef<number | null>(null);
  const cursorPositionRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
    console.log(e.target.value);
  }

  const handleToolbarAction = (syntax: string) => {
    if (textareaRef.current !== null) {
      const startPosition = textareaRef.current.selectionStart;
      const endPosition = textareaRef.current.selectionEnd;
      const selectedText = markdownContent.substring(startPosition, endPosition);
      const preSelecttext = markdownContent.substring(0, startPosition);
      const postSelecttext = markdownContent.substring(endPosition);
      cursorPositionRef.current = startPosition + syntax.length;

      if (syntax === '```') {
        setMarkdownContent(preSelecttext + '```\n' + selectedText + '\n```' + postSelecttext)
      } else {
        setMarkdownContent(preSelecttext + syntax + selectedText + syntax + postSelecttext);
      }

    }
  };
  
  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.focus();
      if (cursorPositionRef.current !== null) {
        textareaRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
      }
    }
  }, [markdownContent])

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
      <Toolbar onClick={handleToolbarAction} />
      <div className='markdown-editor__container-edit-preview'>
        <MarkdownEditor ref={textareaRef} value={markdownContent} onChange={handleChange} />
        <Preview html={parsedHTML} />
      </div>
    </div>
  )
}

export default App
