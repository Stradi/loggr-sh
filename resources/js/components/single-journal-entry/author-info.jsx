import { relativeDate } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function AuthorInfo({ journalEntry }) {
  return (
    <div className="flex gap-2 items-center">
      <Link href={`/@${journalEntry.user.handle}`} className="group">
        <img
          className="h-12 rounded-full group-hover:brightness-95"
          src={journalEntry.user.avatar}
        />
      </Link>
      <div className="text-sm font-medium">
        <div className="flex gap-2">
          <Link
            href={`/@${journalEntry.user.handle}`}
            className="hover:underline"
          >
            <span>{journalEntry.user.name}</span>{" "}
            <span className="text-neutral-500">
              @{journalEntry.user.handle}
            </span>
          </Link>
        </div>
        <time className="text-neutral-500" dateTime={journalEntry.created_at}>
          {relativeDate(new Date(journalEntry.created_at))}
        </time>
      </div>
    </div>
  );
}
