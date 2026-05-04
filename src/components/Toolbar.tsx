import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import type { ToolbarProps } from "../types";
import boldIcon from '../assets/icons/Bold.png';
import italicIcon from '../assets/icons/Italic.png';
import codeIcon from '../assets/icons/Code.png';
import terminalIcon from '../assets/icons/Terminal.png';
import previewIcon from '../assets/icons/Preview.png';

function Toolbar({ onClick, onSave, onTogglePreview, onToggleSidebar, saveStatus, onDownload }: ToolbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#1E1E1E] text-white flex justify-between py-[16px] px-[40px]">

            <div className="self-end flex items-center">

                <button onClick={() => { setIsOpen(!isOpen); onToggleSidebar(); }} className="cursor-pointer px-[6px] mx-[16px] flex flex-col gap-1">
                    <span className={`block w-6 h-0.5 bg-[#474747] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#474747] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#474747] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
                <button className="cursor-pointer px-[6px]" onClick={() => onClick('**')}>
                    <img src={boldIcon} alt="Bold" />
                </button>
                <button className="cursor-pointer px-[6px]" onClick={() => onClick('_')}>
                    <img src={italicIcon} alt="Italic" />
                </button>
                <button className="cursor-pointer px-[6px]" onClick={() => onClick('`')}>
                    <img src={codeIcon} alt="Code" />
                </button>
                <button className="cursor-pointer px-[6px]" onClick={() => onClick('```')}>
                    <img src={terminalIcon} alt="Code Block" />
                </button>

            </div>

            <div className="self-end flex items-center">

                <button className="cursor-pointer px-[12px]" onClick={onTogglePreview}>
                    <img src={previewIcon} alt="Preview" />
                </button>
                <button onClick={onSave} className="bg-[#121212] text-[#e8e6e6] py-[6px] px-[10px] mx-[12px] rounded-sm cursor-pointer">Save</button>
                <div className="mr-[20px]">
                    {saveStatus === 'saving' && <Loader2 className="animate-spin" />}
                    {saveStatus === 'saved' && <Check className="text-[#22c55e]" />}
                </div>
                <button onClick={onDownload} className="bg-[#ff6a00] text-[#e8e6e6] py-[6px] px-[20px] rounded-sm cursor-pointer">Download</button>
                
            </div>

        </div>
    );
}

export default Toolbar;