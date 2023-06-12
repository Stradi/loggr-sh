import {Link} from "@inertiajs/react";

export default function SingleJournal({journal}) {
  return (
    <Link
      href={route("journal.show", {
        journal: journal.slug,
      })}
      className="group/entry cursor-pointer"
      as={"article"}
    >
      <article
        className="p-4 border-b border-neutral-300 group-hover/entry:bg-neutral-50 transition-[background-color] duration-150"
      >
        <main className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-black">
              {journal.name}
            </h1>

            <div className="text-sm text-neutral-700 space-x-2">
              <span>
                {journal.entries_count === 0 ? "No entries" : `${journal.entries_count} entries`}
              </span>
              <span>
                {journal.followers_count === 0 ? "No followers" : `${journal.followers_count} followers`}
              </span>
            </div>
          </div>
          <p>
            {journal.description}
          </p>
        </main>
        <footer>
        </footer>
      </article>
    </Link>
  )
}
