import type { MarkdownEditorProps } from '../types';

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    return (
        <div>
            <textarea value={value} name="markdown-editor" id="markdown-editor" onChange={onChange}></textarea>
        </div>
    );
}

export default MarkdownEditor;