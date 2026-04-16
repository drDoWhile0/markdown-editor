export interface MarkdownEditorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface PreviewProps {
    html: string;
}

export interface ToolbarProps {
    onClick: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}