import { forwardRef } from 'react';
import type { MarkdownEditorProps } from '../types';

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(({ value, onChange }, ref) => {

    return (
        <div>
            <textarea ref={ref} value={value} name="markdown-editor" id="markdown-editor" onChange={onChange}></textarea>
        </div>
    );
});

export default MarkdownEditor;