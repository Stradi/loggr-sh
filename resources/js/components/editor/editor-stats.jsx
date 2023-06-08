import { relativeDate } from "@/lib/utils";
import useEditorStore from "@/stores/editor-store";
import { useEffect, useState } from "react";

export default function EditorStats() {
  const [characterCount, wordCount] = useEditorStore((state) => [
    state.characterCount,
    state.wordCount,
  ]);

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        {characterCount === 0 ? (
          <p>Start writing to see stats.</p>
        ) : (
          <p>
            {characterCount} characters, {wordCount} words
          </p>
        )}

        <div className="flex items-center gap-2">
          <StatusText />
        </div>
      </div>
    </div>
  );
}

function StatusText() {
  const [_, forceRender] = useState(0);
  const [status, lastSavedAt] = useEditorStore((state) => [
    state.status,
    state.lastSavedAt,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender((i) => i + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p>
      {status === "idle" && ""}
      {status === "saving" && "Saving..."}
      {status === "saved" && `Saved ${relativeDate(lastSavedAt)}`}
      {status === "error" && "Well, something went wrong."}
    </p>
  );
}
