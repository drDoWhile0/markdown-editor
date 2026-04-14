import { useState } from 'react'
import MarkdownEditor from './components/MarkdownEditor'
import './App.css'

function App() {
  const [textAreaContent, setTextAreaContent] = useState('');

  return (
    <MarkdownEditor />
  )
}

export default App
