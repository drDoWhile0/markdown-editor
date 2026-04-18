import type { ToolbarProps } from "../types";
import boldIcon from '../assets/icons/Bold.png';
import italicIcon from '../assets/icons/Italic.png';
import codeIcon from '../assets/icons/Code.png';
import terminalIcon from '../assets/icons/Terminal.png';
import previewIcon from '../assets/icons/Preview.png';

function Toolbar({ onClick }: ToolbarProps) {
    return (
        <div className="bg-[#1E1E1E] text-white flex justify-between py-[16px] px-[40px]">
            <div className="self-end">
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
                <button className="cursor-pointer px-[12px]">
                    <img src={previewIcon} alt="Preview" />
                </button>
                <button className="bg-[#ff6a00] py-[6px] px-[20px] rounded-sm cursor-pointer">Download</button>
            </div>
        </div>
    );
}

export default Toolbar;