import { useState } from 'react';
import type { SidebarProps, Folder, MarkdownDocument } from '../types';
import TextField from '@mui/material/TextField';
import NewFile from '../assets/icons/NewFile.png';
import NewFolder from '../assets/icons/NewFolder.png';
import Sort from '../assets/icons/Sort.png';
import Trash from '../assets/icons/Trash.png'
import Settings from '../assets/icons/Settings.png';

function FolderItem({ 
    folder, 
    documents, 
    onRenameFolder, 
    onDeleteFolder, 
    onSelectDocument, 
    activeDocument, 
    onSelect,
    onRenameDocument
}: 
{
    folder: Folder;
    documents: MarkdownDocument[];
    onRenameFolder: (id: string, newName: string) => void;
    onRenameDocument: (id: string, newTitle: string) => void;
    onDeleteFolder: (id: string) => void;
    onSelectDocument: (doc: MarkdownDocument) => void;
    onSelect: (id: string) => void;
    activeDocument: MarkdownDocument | null;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(folder.name);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');

    return (
        <li className='my-4 text-sm'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => { setIsOpen(!isOpen); onSelect(folder.id); }}>
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
                        className='text-[#e8e6e6]'
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
                            onClick={() => onSelectDocument(doc)}
                            onDoubleClick={() => { setEditingId(doc.id); setEditingTitle(doc.title); }}
                            className={`my-2 cursor-pointer ${activeDocument?.id === doc.id ? 'text-[#e8e6e6]' : 'text-[#474747]'}`}
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
                                    className='bg-transparent border-b border-[#ff6a00] outline-none text-[#e8e6e6] w-full'
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
    activeDocument, 
    onSelectDocument, 
    onNewDocument, 
    onRenameDocument, 
    onDeleteDocument,
    onNewFolder,
    onRenameFolder,
    onDeleteFolder
}: SidebarProps) 

{
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

    return (
        <div className='px-[40px]'>
            <div className='sidebar-component__search justify-self-center my-6'>
                <TextField 
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                    label="Search"
                    sx={{
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                            top: "50%",
                            transform: "translate(14px, -50%)",
                        },
                        "& .MuiInputBase-input": {
                            color: "#e8e6e6",
                        },
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#3d3d3d" },
                        "&:hover fieldset": { borderColor: "#ff6a00"} ,
                        "&.Mui-focused fieldset": { borderColor: "#ff6a00", },
                        },
                        "& label": {
                            color: "#e8e6e6",
                            opacity: 1,
                        },
                        "& label.Mui-focused": {
                            color: "#ff6a00",
                        },
                    }}
                />
            </div>
            <div className="flex justify-evenly items-center my-4">
                <button className='cursor-pointer px-[6px]' onClick={() => onNewDocument(selectedFolderId)}>
                    <img src={NewFile} alt="New File" />
                </button>
                <button className='cursor-pointer px-[6px]' onClick={onNewFolder}>
                    <img src={NewFolder} alt="New Folder" />
                </button>
                <button className='cursor-pointer'>
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

            <ul className='text-[#e8e6e6] my-8'>
                {/* Root level docs (no folder) */}
                {documents.filter(d => d.folder_id === null).map(doc => (
                    <li
                        key={doc.id}
                        onClick={() => { onSelectDocument(doc); setSelectedFolderId(null); }}
                        onDoubleClick={() => { setEditingId(doc.id); setEditingTitle(doc.title); }}
                        className={`my-4 cursor-pointer text-sm ${activeDocument?.id === doc.id ? 'text-[#e8e6e6]' : ''}`}
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
                                className='bg-transparent border-b border-[#ff6a00] outline-none text-[#e8e6e6] w-full'
                            />
                       ) : (
                            doc.title
                       )}
                    </li>
                ))}

                {/* Folders */}
                {folders.map(folder => (
                    <FolderItem 
                        key={folder.id}
                        folder={folder}
                        documents={documents.filter(d => d.folder_id === folder.id)}
                        onRenameFolder={onRenameFolder}
                        onRenameDocument={onRenameDocument}
                        onDeleteFolder={onDeleteFolder}
                        onSelectDocument={(doc) => { onSelectDocument(doc); setSelectedFolderId(null); }}
                        activeDocument={activeDocument}
                        onSelect={(id) => setSelectedFolderId(id)}
                    />
                ))}
            </ul>

            <div>
                <button className='cursor-pointer'>
                    <img src={Settings} alt="Settings" />
                </button>
            </div>
        </div>
    );
}

export default SideBar;