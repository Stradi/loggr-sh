import EditorRenderer from "@/components/editor/editor-renderer";
import AppLayout from "@/layouts/app-layout";

import { router } from "@inertiajs/react";

export default function Page({ journalEntry }) {
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

  return (
    <AppLayout>
      <div className="p-4 max-w-3xl">
        <EditorRenderer journalEntry={journalEntry} onSave={handleSave} />
      </div>
    </AppLayout>
  );
}
