import EditorRenderer from "@/components/editor/editor-renderer";
import AppLayout from "@/layouts/app-layout";

import Button from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import EditJournalEntryDialog from "./edit-journal-entry-dialog";

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
      <div className="max-w-3xl space-y-2 border-r border-neutral-300 border-b">
        <nav className="p-4 border-b border-neutral-300">
          <ol className="flex justify-between items-center">
            <li>
              <Button variant="outline" asChild>
                <Link
                  href={route("journal_entry.show", {
                    journal: journalEntry.journal.slug,
                    journalEntry: journalEntry.slug,
                  })}
                >
                  {journalEntry.is_public ? "View" : "Preview"}
                </Link>
              </Button>
            </li>
            <li>
              <EditJournalEntryDialog
                defaultValues={{
                  slug: journalEntry.slug,
                  is_public: journalEntry.is_public ? "1" : "0",
                }}
                journalSlug={journalEntry.journal.slug}
              />
            </li>
          </ol>
        </nav>
        <div className="p-4">
          <EditorRenderer journalEntry={journalEntry} onSave={handleSave} />
        </div>
      </div>
    </AppLayout>
  );
}
