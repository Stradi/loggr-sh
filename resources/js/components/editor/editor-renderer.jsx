import useEditorStore from "@/stores/editor-store";
import { useEffect, useState } from "react";
import Editor from "./editor";
import EditorStats from "./editor-stats";

export default function EditorRenderer({ journalEntry, onSave }) {
  const [lastSavedContent, setLastSavedContent] = useState(
    journalEntry.content
  );

  const [title, content, setStatus, setLastSavedAt] = useEditorStore(
    (state) => [
      state.title,
      state.content,
      state.setStatus,
      state.setLastSavedAt,
    ]
  );

  function callSave() {
    if (lastSavedContent === content || content === "" || title === "") {
      return;
    }

    onSave(title, content);
    setLastSavedContent(content);
  }

  useEffect(() => {
    const saveInterval = setInterval(() => {
      callSave();
    }, 1000);

    return () => {
      clearInterval(saveInterval);
    };
  }, [title, content, lastSavedContent, onSave]);

  useEffect(() => {
    setStatus("saved");
    setLastSavedAt(new Date(journalEntry.updated_at));
    setLastSavedContent(journalEntry.content);
  }, [journalEntry, setLastSavedAt, setStatus]);

  return (
    <div className="flex flex-col gap-4">
      <EditorStats />
      <Editor
        initialContent={
          journalEntry.content === ""
            ? `<h1>${journalEntry.name}</h1>`
            : `<h1>${journalEntry.name}</h1>${journalEntry.content}`
        }
        onSave={() => callSave()}
      />
    </div>
  );
}
