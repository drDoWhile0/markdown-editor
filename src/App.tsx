import { useState } from 'react'
import type { MarkdownEditorProps } from './types';
import MarkdownEditor from './components/MarkdownEditor'
import './App.css'

function App({ value, onChange }: MarkdownEditorProps) {
  const [markdownContent, setMarkdownContent] = useState('# Hello there');

  return (
    <MarkdownEditor value={markdownContent} onChange={onChange} />
  )
}

export default App
