import { useState } from 'react'
import { marked } from 'marked';
import MarkdownEditor from './components/MarkdownEditor'
import Preview from './components/Preview';
import './App.css'

function App() {
  const [markdownContent, setMarkdownContent] = useState('# Hello there');
  const markDownPreviewContent = marked.parse(markdownContent) as string;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className='markdown-editor-preview__container'>
      <MarkdownEditor value={markdownContent} onChange={handleChange} />
      <Preview _html={markDownPreviewContent } />
    </div>
  )
}

export default App
