import type { ToolbarProps } from "../types";

function Toolbar({ onClick }: ToolbarProps) {
    return (
        <div>
            <button onClick={() => onClick('**')}>Bold</button>
            <button onClick={() => onClick('_')}>Italic</button>
            <button onClick={() => onClick('`')}>Code</button>
            <button onClick={() => onClick('```')}>Code Block</button>
        </div>
    );
}

export default Toolbar;