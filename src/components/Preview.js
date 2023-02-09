import { marked } from "marked";
import "highlight.js/styles/github.css";

// Retrieved from the markedjs documentation.
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require("highlight.js");
    const language = hljs.getLanguage(lang) ? lang : "javascript";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: false,
  xhtml: true,
});

function markup(text) {
  return { __html: marked.parse(text) };
}

export default function Preview({ text, className }) {
  return (
    <div
      dangerouslySetInnerHTML={markup(text)}
      className={className}
      id="preview"
    />
  );
}
