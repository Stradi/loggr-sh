import SingleJournalEntry from "@/components/single-journal-entry/single-journal-entry";
import Button from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import EditSettingsDialog from "./edit-settings-dialog";
import EditorDialog from "./editor-dialog";

export default function Page({ auth, journalEntry }) {
  console.log(auth);
  return (
    <AppLayout>
      <section className="max-w-3xl border-r border-b border-neutral-300">
        <nav className="p-4 border-b border-neutral-300">
          <ol className="flex justify-between items-center">
            <li>
              <Button variant="outline" asChild>
                <Link
                  href={route("journal.show", {
                    journal: journalEntry.journal.slug,
                  })}
                >
                  Back to {journalEntry.journal.name}
                </Link>
              </Button>
            </li>
            {auth.user && auth.user.id === journalEntry.user_id && (
              <div className="flex gap-2">
                <li>
                  <EditorDialog journalEntry={journalEntry} />
                </li>
                <li>
                  <EditSettingsDialog
                    defaultValues={{
                      slug: journalEntry.slug,
                      is_public: journalEntry.is_public,
                    }}
                    journalSlug={journalEntry.journal.slug}
                  />
                </li>
              </div>
            )}
          </ol>
        </nav>
        <SingleJournalEntry journalEntry={journalEntry} />
      </section>
    </AppLayout>
  );
}
