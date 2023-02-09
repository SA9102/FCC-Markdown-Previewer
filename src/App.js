import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { useState } from "react";
import "./scss/App.css";

// Fills the editor with this Markdown when the page loads.
const fillerText = `# Heading 1
## Heading 2
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
Here's some code, \`<div></div>\`, between 2 backticks.
There's also [links](https://www.freecodecamp.org)
> Block Quotes!
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
**Bold text**
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  
  `;

// The possible view options. Used by the 'view' state.
// If the 'editor-preview' is enabled, the user has the option to decide which panel is shown
// on which side.
const views = ["editor-preview", "editor", "preview"];

export default function App() {
  // The value of markdownText is what will be converted to HTML.
  const [markdownText, setMarkdownText] = useState(fillerText);
  // Determines whether the layout is 'editor-preview' or 'preview-editor' (only if both are shown on the screen).
  const [editorOnLeft, setEditorOnLeft] = useState(true);
  // View type (0 = both editor and preview; 1 = editor only; 2 = preview only).
  const [view, setView] = useState(views[0]);

  // Handles controlled input for Markdown text.
  const handleMarkdownInput = (value) => {
    setMarkdownText(value);
  };

  // Handles the alternation of the editor-preview view.
  const handleSwitchPanels = () => {
    setEditorOnLeft(!editorOnLeft);
  };

  // Handles the switching of different views.
  const handleSwitchView = (v) => {
    setView(v);
  };

  return (
    <div id="page-container">
      <h1 id="title">Markdown Previewer</h1>
      <p id="view-repository">
        <a
          href="https://github.com/SA9102/FCC-Markdown-Previewer/"
          target="_blank"
        >
          View Repository
        </a>
      </p>
      <div id="button-panel">
        <button onClick={handleSwitchPanels} disabled={view !== views[0]}>
          Switch Panels
        </button>

        <button
          onClick={() => handleSwitchView(views[0])}
          disabled={view === views[0]}
        >
          Editor-Preview
        </button>
        <button
          onClick={() => handleSwitchView(views[1])}
          disabled={view === views[1]}
        >
          Editor Only
        </button>
        <button
          onClick={() => handleSwitchView(views[2])}
          disabled={view === views[2]}
        >
          Preview Only
        </button>
      </div>
      <div id="editor-container">
        {view === views[0] ? (
          editorOnLeft ? (
            <>
              <Editor
                text={markdownText}
                onMarkdownInput={handleMarkdownInput}
                className="left"
              />
              <Preview text={markdownText} className="right" />
            </>
          ) : (
            <>
              <Preview text={markdownText} className="left" />
              <Editor
                text={markdownText}
                onMarkdownInput={handleMarkdownInput}
                className="right"
              />
            </>
          )
        ) : view === views[1] ? (
          <Editor
            text={markdownText}
            onMarkdownInput={handleMarkdownInput}
            className="only"
          />
        ) : (
          <Preview text={markdownText} className="only" />
        )}
      </div>
      <p id="copyright">
        &copy; Shayan Ali (SA9102). Created for freeCodeCamp.
      </p>
    </div>
  );
}
