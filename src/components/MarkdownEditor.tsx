import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { Prec } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { markdown } from '@codemirror/lang-markdown';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { forwardRef } from 'react';
import type { MarkdownEditorProps } from '../types';

const customHighlight = HighlightStyle.define([
  { tag: [tags.heading1, tags.heading2, tags.heading3, tags.heading4, tags.heading5, tags.heading6], color: '#ff6a00' },
]);

const MarkdownEditor = forwardRef<ReactCodeMirrorRef, MarkdownEditorProps>(({ value, onChange }, ref) => {
    return (
        <CodeMirror 
            ref={ref} 
            value={value} 
            onChange={onChange} 
            extensions={[markdown(), Prec.highest(syntaxHighlighting(customHighlight))]}
            theme={tokyoNight}
            height='100%'
            className='h-full w-full'
        />
    );
});

export default MarkdownEditor;