import AuthorInfo from "./author-info";
import JournalEntryStats from "./journal-entry-stats";

export default function SingleJournalEntry({ journalEntry }) {
  return (
    <article className="divide-y divide-neutral-300">
      <header className="space-y-4 p-4">
        <div className="prose">
          <h1>{journalEntry.name}</h1>
        </div>
        <AuthorInfo journalEntry={journalEntry} />
        <JournalEntryStats journalEntry={journalEntry} />
      </header>
      <section className="p-4 prose prose-sm prose-p:text-lg max-w-none prose-headings:mb-1 prose-headings:mt-3 prose-p:mb-0 prose-p:mt-1.5">
        <div
          dangerouslySetInnerHTML={{
            __html: journalEntry.content,
          }}
        />
      </section>
      <section>
        <div className="p-4">
          <h2 className="text-lg font-medium">Replies (64)</h2>
        </div>
      </section>
    </article>
  );
}
