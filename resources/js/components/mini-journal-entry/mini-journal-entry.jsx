import {Link} from "@inertiajs/react";
import AuthorInfo from "../author-info.jsx";
import JournalEntryStats from "../single-journal-entry/journal-entry-stats";

export default function MiniJournalEntry({journalEntry}) {
  return (
    <Link
      href={route("journal_entry.show", {
        journal: journalEntry.journal.slug,
        journalEntry: journalEntry.slug,
      })}
      className="group/entry cursor-pointer"
      as={"article"}
    >
      <article
        className="p-4 border-b border-neutral-300 group-hover/entry:bg-neutral-50 transition-[background-color] duration-150">
        <header>
          <AuthorInfo
            name={journalEntry.user.name}
            handle={journalEntry.user.handle}
            avatar={journalEntry.user.avatar}
            created_at={journalEntry.created_at}
          />
        </header>
        <main
          className="flex flex-col gap-2 text-sm prose prose-sm prose-p:text-base prose-p:text-neutral-900 max-w-none prose-headings:mb-1 prose-headings:mt-3 prose-p:mb-0 prose-p:mt-1.5">
          <span className="text-2xl font-semibold text-black">
            {journalEntry.name}
          </span>
          {!journalEntry.is_public && (
            <div className="p-2 border border-neutral-300 bg-neutral-100 rounded-xl text-neutral-700">
              <p>
                <b>Note:</b> This entry currently isn't visible to anyone except
                you. To make it public, go to the edit page and make it public
                in the settings section.
              </p>
            </div>
          )}
          <p
            dangerouslySetInnerHTML={{
              __html: journalEntry.excerpt,
            }}
          />
          <JournalEntryStats journalEntry={journalEntry}/>
        </main>
      </article>
    </Link>
  );
}
