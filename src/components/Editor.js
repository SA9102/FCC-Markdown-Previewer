export default function Editor({ text, onMarkdownInput, className }) {
  return (
    <textarea
      id="editor"
      className={className}
      name="editor"
      value={text}
      onChange={(e) => onMarkdownInput(e.target.value)}
    >
      {text}
    </textarea>
  );
}
