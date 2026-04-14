import { useState } from 'react'
import MarkdownEditor from './components/MarkdownEditor'
import './App.css'

function App() {
  const [markdownContent, setMarkdownContent] = useState('# Hello there');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
    console.log(e.target.value);
    
  }

  return (
    <MarkdownEditor value={markdownContent} onChange={handleChange} />
  )
}

export default App
