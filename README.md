# Markdown Live Editor

A split-pane Markdown editor built with React and TypeScript. Write Markdown on the left, see the rendered output on the right — updated in real time with debounced parsing and syntax highlighting for code blocks.

---

## Features

- **Live preview** — rendered HTML updates as you type, debounced at 300ms to avoid unnecessary re-renders
- **Syntax highlighting** — fenced code blocks are highlighted via highlight.js
- **Toolbar** — one-click insertion of Bold, Italic, Code, and Code Block syntax, cursor-aware so it wraps selected text or places the cursor between markers
- **TypeScript throughout** — fully typed props, refs, and API interfaces

---

## Tech Stack

- React 19
- TypeScript
- Vite
- [marked](https://marked.js.org/) — Markdown parsing
- [highlight.js](https://highlightjs.org/) — syntax highlighting

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/markdown-live-editor.git
cd markdown-live-editor
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

### Writing Markdown

Type any valid Markdown in the left pane. The right pane updates automatically after a short pause.

Supported syntax includes:

```
# Heading 1
## Heading 2

**bold** and _italic_ text

- unordered lists
1. ordered lists

[link text](https://example.com)

![alt text](image-url)

`inline code`

```javascript
// fenced code block with syntax highlighting
const greeting = "hello world";
```
```

### Using the Toolbar

- **Bold** — wraps selected text in `**`, or inserts `****` with cursor placed between
- **Italic** — wraps selected text in `_`
- **Code** — wraps selected text in backticks
- **Code Block** — wraps selected text in triple backticks

Select text in the editor first, then click a toolbar button to wrap it. Click without a selection to insert empty markers.

---

## Project Structure

```
src/
├── components/
│   ├── MarkdownEditor.tsx   # Controlled textarea, forwards ref to parent
│   ├── Preview.tsx          # Renders parsed HTML, applies syntax highlighting
│   └── Toolbar.tsx          # Markdown insertion buttons
├── types.ts                 # Shared TypeScript interfaces
├── App.tsx                  # State, debounce logic, ref management
└── App.css                  # Layout styles
```

---

## Key Concepts Demonstrated

- **Controlled inputs** — textarea value and onChange wired through props
- **useRef** — holds debounce timer ID across renders without triggering re-renders; provides direct DOM access to the textarea for cursor position reading
- **useEffect** — debounces markdown parsing on content change with proper cleanup on unmount
- **forwardRef** — exposes the textarea DOM node from `MarkdownEditor` to `App` so the toolbar handler can read selection positions
- **dangerouslySetInnerHTML** — safely renders parsed HTML output in the preview pane
- **TypeScript interfaces** — typed props across all components via a shared `types.ts`
