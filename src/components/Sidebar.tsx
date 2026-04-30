import { useState } from 'react';
import type { SidebarProps, Folder, MarkdownDocument } from '../types';
import SidebarSearch from './SidebarSearch';
import NewFile from '../assets/icons/NewFile.png';
import NewFolder from '../assets/icons/NewFolder.png';
import Sort from '../assets/icons/Sort.png';
import Trash from '../assets/icons/Trash.png'
import Settings from '../assets/icons/Settings.png';

function FolderItem({ 
    folder, 
    documents, 
    onRenameFolder, 
    onSelectDocument, 
    activeDocument, 
    onSelect,
    onRenameDocument,
    draggedDocId,
    onMoveDocument,
    onDragStart,
    onDragEnd
}: 
{
    folder: Folder;
    documents: MarkdownDocument[];
    draggedDocId: string | null;
    onDragStart: (id: string) => void;
    onDragEnd: () => void;
    onRenameFolder: (id: string, newName: string) => void;
    onRenameDocument: (id: string, newTitle: string) => void;
    onDeleteFolder: (id: string) => void;
    onSelectDocument: (doc: MarkdownDocument) => void;
    onSelect: (id: string) => void;
    onMoveDocument: (docId: string, folderId: string | null) => void;
    activeDocument: MarkdownDocument | null;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(folder.name);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');

    return (
        <li className='my-4 text-sm'>
            <div 
                className='flex items-center gap-2 cursor-pointer' 
                onClick={() => { setIsOpen(!isOpen); onSelect(folder.id); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (draggedDocId) onMoveDocument(draggedDocId, folder.id); }}
            >
                <span className='text-[#474747]'>{isOpen ? '▾' : '▸'}</span>
                {isEditing ? (
                    <input
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onBlur={() => { onRenameFolder(folder.id, editingName); setIsEditing(false); }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') { onRenameFolder(folder.id, editingName); setIsEditing(false); }
                            if (e.key === 'Escape') { setIsEditing(false); }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='bg-transparent border-b border-[#ff6a00] outline-none text-[#e8e6e6] w-full'
                    />
                ) : (
                    <span
                        className='text-[#474747] hover:text-[#b1ada1] cursor-pointer'
                        onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                    >
                        {folder.name}
                    </span>
                )}
            </div>

            {isOpen && (
                <ul className='ml-4 mt-2'>
                    {documents.map(doc => (
                        <li
                            key={doc.id}
                            draggable
                            onDragStart={() => onDragStart(doc.id)}
                            onDragEnd={onDragEnd}
                            onClick={() => onSelectDocument(doc)}
                            onDoubleClick={() => { setEditingId(doc.id); setEditingTitle(doc.title); }}
                            className={`my-2 cursor-pointer hover:text-[#b1ada1] ${activeDocument?.id === doc.id ? 'text-[#b1ada1]' : 'text-[#474747]'}`}
                        >
                            {editingId === doc.id ? (
                                <input
                                    autoFocus
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => { onRenameDocument(doc.id, editingTitle); setEditingId(null); }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') { onRenameDocument(doc.id, editingTitle); setEditingId(null); }
                                        if (e.key === 'Escape') { setEditingId(null); }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-transparent border-b border-[#ff6a00] outline-none text-[#b1ada1] w-full'
                                />
                            ) : (
                                doc.title
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

function SideBar({ 
    documents,
    folders, 
    userEmail,
    activeDocument, 
    onSelectDocument, 
    onMoveDocument,
    onNewDocument, 
    onRenameDocument, 
    onDeleteDocument,
    onNewFolder,
    onRenameFolder,
    onDeleteFolder,
    onSignOut
}: SidebarProps) 

{
    type SortOrder = 'default' | 'asc' | 'desc';
    const [sortOrder, setSortOrder] = useState<SortOrder>('default');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [draggedDocId, setDraggedDocId] = useState<string | null>(null);

    const sortItems = <T extends { title?: string; name?: string }>(items: T[]): T[] => {
        if (sortOrder === 'asc') return [...items].sort((a, b) => (a.title ?? a.name ?? '').localeCompare(b.title ?? b.name ?? ''));
        if (sortOrder === 'desc') return [...items].sort((a, b) => (b.title ?? b.name ?? '').localeCompare(a.title ?? a.name ?? ''));
        return items;
    };

    return (
        <div className='px-[40px]'>
            <div className='sidebar-component__search justify-self-center my-6'>
                <SidebarSearch 
                    documents={documents}
                    folders={folders}
                    activeDocument={activeDocument}
                    onSelectDocument={onSelectDocument}
                />
            </div>
            <div className="flex justify-evenly items-center my-4">
                <button className='cursor-pointer px-[6px]' onClick={() => onNewDocument(selectedFolderId)}>
                    <img src={NewFile} alt="New File" />
                </button>
                <button className='cursor-pointer px-[6px]' onClick={onNewFolder}>
                    <img src={NewFolder} alt="New Folder" />
                </button>
                <button 
                    className='cursor-pointer'
                    onClick={() => setSortOrder(o => o === 'default' ? 'asc' : o === 'asc' ? 'desc' : 'default')}
                >
                    <img src={Sort} alt="Sort Order" />
                </button>
                <button 
                    className='cursor-pointer px-[6px]' 
                    onClick={() => {
                        if (selectedFolderId) {
                            onDeleteFolder(selectedFolderId);
                            setSelectedFolderId(null);
                        } else if (activeDocument) {
                            onDeleteDocument(activeDocument.id);
                        }
                    }}
                >
                    <img src={Trash} alt="Delete Item" />
                </button>
            </div>

            <ul 
                className='text-[#b1ada1] my-8'
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (draggedDocId) onMoveDocument(draggedDocId, null); }}
            >
                {/* Root level docs (no folder) */}
                {sortItems(documents.filter(d => d.folder_id === null)).map(doc => (
                    <li
                        key={doc.id}
                        draggable
                        onDragStart={() => setDraggedDocId(doc.id)}
                        onDragEnd={() => setDraggedDocId(null)}
                        onClick={() => { onSelectDocument(doc); setSelectedFolderId(null); }}
                        onDoubleClick={() => { setEditingId(doc.id); setEditingTitle(doc.title); }}
                        className={`my-4 cursor-pointer text-sm hover:text-[#b1ada1] ${activeDocument?.id === doc.id ? 'text-[#b1ada1]' : 'text-[#474747]'}`}
                    >
                       {editingId === doc.id ? (
                            <input 
                                autoFocus
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onBlur={() => { onRenameDocument(doc.id, editingTitle); setEditingId(null); }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') { onRenameDocument(doc.id, editingTitle); setEditingId(null); }
                                    if (e.key === 'Escape') { setEditingId(null); }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className='bg-transparent border-b border-[#ff6a00] outline-none text-[#b1ada1] w-full'
                            />
                       ) : (
                            doc.title
                       )}
                    </li>
                ))}

                {/* Folders */}
                {sortItems(folders).map(folder => (
                    <FolderItem 
                        key={folder.id}
                        folder={folder}
                        documents={documents.filter(d => d.folder_id === folder.id)}
                        draggedDocId={draggedDocId}
                        onDragStart={(id) => setDraggedDocId(id)}
                        onDragEnd={() => setDraggedDocId(null)}
                        onMoveDocument={onMoveDocument}
                        onRenameFolder={onRenameFolder}
                        onRenameDocument={onRenameDocument}
                        onDeleteFolder={onDeleteFolder}
                        onSelectDocument={(doc) => { onSelectDocument(doc); setSelectedFolderId(null); }}
                        activeDocument={activeDocument}
                        onSelect={(id) => setSelectedFolderId(id)}
                    />
                ))}
            </ul>

            <div className='flex item-center gap-3'>
                <button
                    onClick={onSignOut}
                    className="w-8 h-8 rounded-full bg-[#ff6a00] text=[#e8e6e6] text-sm font-medium flex items-center justify-center cursor-pointer hover:opacity-80"
                    title={userEmail}
                >
                    {userEmail.charAt(0).toUpperCase()}
                </button>
                <button className='cursor-pointer'>
                    <img src={Settings} alt="Settings" />
                </button>
            </div>
        </div>
    );
}

export default SideBar;