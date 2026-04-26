import { useState } from 'react';
import type { SidebarProps } from '../types';
import TextField from '@mui/material/TextField';
import NewFile from '../assets/icons/NewFile.png';
import NewFolder from '../assets/icons/NewFolder.png';
import Sort from '../assets/icons/Sort.png';
import Trash from '../assets/icons/Trash.png'
import Settings from '../assets/icons/Settings.png';

function SideBar({ documents, activeDocument, onSelectDocument, onNewDocument, onRenameDocument, onDeleteDocument }: SidebarProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');

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
                <button className='cursor-pointer px-[6px]' onClick={onNewDocument}>
                    <img src={NewFile} alt="New File" />
                </button>
                <button className='cursor-pointer px-[6px]'>
                    <img src={NewFolder} alt="New Folder" />
                </button>
                <button className='cursor-pointer'>
                    <img src={Sort} alt="Sort Order" />
                </button>
                <button className='cursor-pointer px-[6px]' onClick={() => activeDocument && onDeleteDocument(activeDocument.id)}>
                    <img src={Trash} alt="Delete Project" />
                </button>
            </div>

            <ul className='text-[#e8e6e6] my-8'>
                {documents.map((doc) => (
                    <li
                        key={doc.id}
                        onClick={() => onSelectDocument(doc)}
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