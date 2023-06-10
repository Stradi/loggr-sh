import EditorRenderer from "@/components/editor/editor-renderer";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import useEditorStore from "@/stores/editor-store";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function EditorDialog({ journalEntry }) {
  const [isOpen, setIsOpen] = useState(false);

  const [title, content] = useEditorStore((state) => [
    state.title,
    state.content,
  ]);

  function handleSave(title, content) {
    router.put(
      route("journal_entry.update", {
        journal: journalEntry.journal.slug,
        journalEntry: journalEntry.slug,
      }),
      {
        name: title,
        content,
      }
    );
  }

  function handleOpenChange(state) {
    if (state === false) {
      handleSave(title, content);
    }

    setIsOpen(state);
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={handleOpenChange}
      title="Edit Journal Entry"
      description="Change the content of your journal entry. Don't worry, we are saving your changes automatically."
      trigger={<Button>Edit</Button>}
      contentClass="max-w-[768px]"
    >
      <EditorRenderer journalEntry={journalEntry} onSave={handleSave} />
    </Dialog>
  );
}
