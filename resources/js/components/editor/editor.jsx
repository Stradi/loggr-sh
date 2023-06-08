import useEditorStore from "@/stores/editor-store";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";
import TitleNode from "./title-node";

import "./editor.css";

const CustomDocument = Document.extend({
  content: "title block+",
});

export default function Editor({ initialContent = "<h1></h1>", onSave }) {
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
      StarterKit.configure({
        document: false,
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({ node }) => {
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
    onCreate: ({ editor }) => {
      const title = editor.getHTML().match(/<h1>(.*?)<\/h1>/)?.[1] || "";
      const contentWithoutTitle = editor.getHTML().replace(/<h1>.*?<\/h1>/, "");

      setTitle(title);
      setContent(contentWithoutTitle);
      setCharacterCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
    onUpdate: ({ editor }) => {
      const title = editor.getHTML().match(/<h1>(.*?)<\/h1>/)?.[1] || "";
      const contentWithoutTitle = editor.getHTML().replace(/<h1>.*?<\/h1>/, "");

      setTitle(title);
      setContent(contentWithoutTitle);
      setCharacterCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    },
  });

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

  return <EditorContent editor={editor} autoFocus />;
}
