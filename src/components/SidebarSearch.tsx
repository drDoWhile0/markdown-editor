import { useState } from "react";
import TextField from "@mui/material/TextField";
import type { MarkdownDocument, Folder } from "../types";

interface SidebarSearchProps {
    documents: MarkdownDocument[];
    folders: Folder[];
    activeDocument: MarkdownDocument | null;
    onSelectDocument: (doc: MarkdownDocument) => void;
}

function SidebarSearch ({ documents, folders, activeDocument, onSelectDocument }: SidebarSearchProps) {
    const [query, setQuery] = useState('');

    const q = query.toLocaleLowerCase();

    const matchingDocs = query
        ? documents.filter(d => d.title.toLocaleLowerCase().includes(q))
        : [];

    const matchingFolders = query
        ? folders.filter(f => f.name.toLocaleLowerCase().includes(q))
        : [];

    const getFolderName = (folderId: string | null) => {
        if (!folderId) return null;
        return folders.find(f => f.id === folderId)?.name ?? null;
    };

    return (
        <div>
            <div className="justify-self-center my-6">
                <TextField 
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                    label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                            top: "50%",
                            transform: "translate(14px, -50%)",
                        },
                        "& .MuiInputBase-input": { color: "#e8e6e6" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#3d3d3d" },
                            "&:hover fieldset": { borderColor: "#ff6a00" },
                            "&.Mui-focused fieldset": { borderColor: "#ff6a00" },
                        },
                        "& label": { color: "#b1ada1", opacity: 1 },
                        "& label.Mui-focused": { color: "#ff6a00" },
                    }}
                />
            </div>

            {query && (
                <ul className='text-[#b1ada1] text-sm'>
                    {matchingFolders.length > 0 && (
                        <>
                            <li className='text-[#474747] text-xs mb-2'>Folders</li>
                            {matchingFolders.map(f => (
                                <li key={f.id} className="my-2 text-[#474747] hover:text-[#b1ada1] cursor-pointer">
                                    {f.name}
                                </li>
                            ))}
                        </>
                    )}

                    {matchingDocs.length > 0 && (
                        <>
                            <li className='text-[#474747] text-xs mt-4 mb-2'>Files</li>
                            {matchingDocs.map(doc => (
                                <li
                                    key={doc.id}
                                    onClick={() => { onSelectDocument(doc); setQuery(''); }}
                                    className={`my-2 cursor-pointer hover:text-[#b1ada1] ${activeDocument?.id === doc.id ? 'text-[#b1ada1]' : 'text-[#474747]'}`}
                                >
                                    <span>{doc.title}</span>
                                    {getFolderName(doc.folder_id) && (
                                        <span className="text-xs text-[#474747] ml-2">in {getFolderName(doc.folder_id)}</span>
                                    )}
                                </li>
                            ))}
                        </>
                    )}

                    {matchingDocs.length === 0 && matchingFolders.length === 0 && (
                        <li className="text-[#474747] text-xs">No results for "{query}"</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SidebarSearch;