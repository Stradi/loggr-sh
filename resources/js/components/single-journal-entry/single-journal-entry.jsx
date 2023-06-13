import AuthorInfo from "../author-info.jsx";
import JournalEntryStats from "./journal-entry-stats";

export default function SingleJournalEntry({ journalEntry }) {
  return (
    <article className="divide-y divide-neutral-300">
      <header className="space-y-4 p-4">
        <div className="prose">
          <h1>{journalEntry.name}</h1>
        </div>
        <AuthorInfo
          name={journalEntry.user.name}
          handle={journalEntry.user.handle}
          avatar={journalEntry.user.avatar}
          created_at={journalEntry.created_at}
        />
        <JournalEntryStats journalEntry={journalEntry} />
      </header>
      <section className="p-4 prose prose-sm prose-p:text-lg max-w-none prose-headings:mb-1 prose-headings:mt-3 prose-p:mb-0 prose-p:mt-1.5">
        {!journalEntry.is_public && (
          <div className="p-2 border border-neutral-300 bg-neutral-100 rounded-xl text-neutral-700">
            <p>
              <b>Note:</b> This entry currently isn't visible to anyone except
              you. To make it public, go to the edit page and make it public in
              the settings section.
            </p>
          </div>
        )}
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
