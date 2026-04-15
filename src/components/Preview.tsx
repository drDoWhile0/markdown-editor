import { useRef, useEffect } from "react";
import hljs from 'highlight.js';
import type { PreviewProps } from "../types";

function Preview({ html }: PreviewProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            const preCodeElements = containerRef.current.querySelectorAll('pre code');
            preCodeElements.forEach((element) => {
                hljs.highlightElement(element as HTMLElement);
            });
        }
    }, [html])

    return(
        <div ref={containerRef}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default Preview;