import SingleJournalEntry from "@/components/single-journal-entry/single-journal-entry";
import AppLayout from "@/layouts/app-layout";

export default function Page({ journal, journalEntry }) {
  return (
    <AppLayout>
      <div className="max-w-3xl border-r border-b border-neutral-300">
        <SingleJournalEntry journalEntry={journalEntry} />
      </div>
    </AppLayout>
  );
}
