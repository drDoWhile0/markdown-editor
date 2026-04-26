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
    onTogglePreview: () => void;
    saveStatus: SaveStatus;
}

export interface MarkdownDocument {
    id: string;
    title: string;
    content: string;
    folder_id: string | null;
    updated_at: string;
}

export interface Folder {
    id: string;
    name: string;
    parent_id: string | null;
}

export interface SidebarProps {
    documents: MarkdownDocument[];
    activeDocument: MarkdownDocument | null;
    onSelectDocument: (doc: MarkdownDocument) => void;
    onNewDocument: () => void;
    onRenameDocument: (id: string, newTitle: string) => void;
    onDeleteDocument: (id: string) => void;
}