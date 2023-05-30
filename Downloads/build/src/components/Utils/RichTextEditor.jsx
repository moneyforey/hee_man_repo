import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
// import Editor from "../../../ckEditor/build/ckeditor";
// import { CKEditor } from "@ckeditor/ckeditor5-react";

const Editor = ({ content1, setContent1 }) => {
  const placeholder = "Type your blog here...";
  const editor = useRef(null);

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    };
  }, [placeholder]);

  return (
    <JoditEditor
      ref={editor}
      value={content1}
      config={config}
      tabIndex={1}
      onChange={(newContent) => setContent1(newContent)}
      defaultValue=""
    />

    // <>

    // </>
  );
};

export default Editor;

// const editorConfiguration = {
//   toolbar: ["bold", "italic"],
// };


// const TextEditor = () => {
//   return (
//     <CKEditor
//       editor={Editor}
//       config={editorConfiguration}
//       data="<p>Hello from CKEditor 5!</p>"
//       onReady={(editor) => {
//         // You can store the "editor" and use when it is needed.
//         console.log("Editor is ready to use!", editor);
//       }}
//       onChange={(event, editor) => {
//         const data = editor.getData();
//         console.log({ event, editor, data });
//       }}
//       onBlur={(event, editor) => {
//         console.log("Blur.", editor);
//       }}
//       onFocus={(event, editor) => {
//         console.log("Focus.", editor);
//       }}
//     />
//   );
// };

// export default TextEditor;
