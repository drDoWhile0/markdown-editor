import type { PreviewProps } from "../types";

function Preview({ _html }: PreviewProps) {

    return(
        <div dangerouslySetInnerHTML={{ __html: _html }} />
    );
}

export default Preview;