import { useRef, useEffect } from "react";
import hljs from 'highlight.js';
import type { PreviewProps } from "../types";

function Preview({ html }: PreviewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            const preCodeElements = containerRef.current.querySelectorAll('code');
            preCodeElements.forEach((element) => {
                hljs.highlightElement(element as HTMLElement);
            });
        }
    }, [html])

    return(
        <div ref={containerRef} className="prose prose-invert">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default Preview;