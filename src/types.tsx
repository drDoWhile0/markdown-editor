export type SaveStatus = 'idle' | 'saving' | 'saved';

export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export interface PreviewProps {
    html: string;
}

export interface ToolbarProps {
    onClick: (syntax: string) => void;
    onSave: () => void;
    saveStatus: SaveStatus;
}
