import SingleJournalEntry from "@/components/single-journal-entry/single-journal-entry";
import Button from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

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
              <li>
                <Button asChild>
                  <Link
                    href={route("journal_entry.edit", {
                      journal: journalEntry.journal.slug,
                      journalEntry: journalEntry.slug,
                    })}
                  >
                    Edit
                  </Link>
                </Button>
              </li>
            )}
          </ol>
        </nav>
        <SingleJournalEntry journalEntry={journalEntry} />
      </section>
    </AppLayout>
  );
}
