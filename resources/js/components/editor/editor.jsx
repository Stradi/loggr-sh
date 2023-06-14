import useEditorStore from "@/stores/editor-store";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {useCallback, useEffect} from "react";
import TitleNode from "./title-node";

import "./editor.css";

const CustomDocument = Document.extend({
  content: "title block+",
});

export default function Editor({initialContent = "<h1></h1>", onSave}) {
  const [setTitle, setContent, setCharacterCount, setWordCount] =
    useEditorStore((state) => [
      state.setTitle,
      state.setContent,
      state.setCharacterCount,
      state.setWordCount,
    ]);

  const editor = useEditor({
    extensions: [
      TitleNode,
      CustomDocument,
      ImageExtension,
      StarterKit.configure({
        document: false,
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({node}) => {
          if (node.type.name === "title") {
            return "What is this entry about?";
          } else if (node.type.name === "heading") {
            if (node.attrs.level === 2) {
              return "Heading 2";
            } else if (node.attrs.level === 3) {
              return "Heading 3";
            } else if (node.attrs.level === 4) {
              return "Heading 4";
            }
          }

          return "Add more content here...";
        },
      }),
      CharacterCount.configure(),
    ],
    content: initialContent,
    onCreate: ({editor}) => {
      const title = editor.getHTML().match(/<h1>(.*?)<\/h1>/)?.[1] || "";
      const contentWithoutTitle = editor.getHTML().replace(/<h1>.*?<\/h1>/, "");

      setTitle(title);
      setContent(contentWithoutTitle);
      setCharacterCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
    onUpdate: ({editor}) => {
      const title = editor.getHTML().match(/<h1>(.*?)<\/h1>/)?.[1] || "";
      const contentWithoutTitle = editor.getHTML().replace(/<h1>.*?<\/h1>/, "");

      setTitle(title);
      setContent(contentWithoutTitle);
      setCharacterCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
    editorProps: {
      handleDrop: function (view, event, slice, moved) {
        // TODO: We should handle the videos as well ("video/webm" and "video/mp4").
        const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
        // TODO: We also should handle the case where the user drops a image from another web page.
        //       This can be handled by checking if the event.dataTransfer.getData("text/x-moz-url") is not null.
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          const filesize = ((file.size / 1024) / 1024).toFixed(4); // MB
          if (ALLOWED_MIME_TYPES.includes(file.type) && filesize < 10) {
            const url = window.URL || window.webkitURL;
            const img = new Image();

            img.src = url.createObjectURL(file);
            img.onload = function () {
              if (this.width > 5000 || this.height > 5000) {
                alert("The image is too large. The maximum allowed size is 5000x5000 pixels.");
              } else {
                uploadImageToServer(file).then((response) => {
                  const image = new Image();
                  image.src = response.data.url;
                  image.onload = function () {
                    const {schema} = view.state;
                    const coordinates = view.posAtCoords({left: event.clientX, top: event.clientY});
                    const node = schema.nodes.image.create({src: response.data.url}); // creates the image element
                    const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                    return view.dispatch(transaction);
                  }
                }).catch((error) => {
                  if (error) {
                    alert('Well, something bad happened. Please try again later.');
                  }
                });
              }
            }
          }
        }
        return false;
      }
    }
  });

  function uploadImageToServer(file) {
    const data = new FormData();
    data.append('file', file);
    return axios.post('/upload-to-s3', data);
  }

  const handleSave = useCallback(
    (e) => {
      if (e.code === "KeyS" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSave && onSave();
      }
    },
    [onSave]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSave);
    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, [handleSave]);

  return <EditorContent editor={editor} autoFocus/>;
}
