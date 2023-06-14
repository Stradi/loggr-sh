import {relativeDate} from "@/lib/utils.js";
import {Link} from "@inertiajs/react";

export default function AuthorInfo({name, handle, avatar, created_at}) {
  return (
    <div className="flex gap-2 items-center">
      <Link href={`/@${handle}`} className="group">
        <img
          className="h-10 rounded-full group-hover:brightness-95"
          src={avatar}
        />
      </Link>
      <div className="text-sm font-medium">
        <div className="flex gap-2">
          <Link
            href={`/@${handle}`}
            className="hover:underline"
          >
            <span>{name}</span>{" "}
            <span className="text-neutral-500">
              @{handle}
            </span>
          </Link>
        </div>
        {
          created_at ? (
            <time className="text-neutral-500" dateTime={created_at}>
              {relativeDate(new Date(created_at))}
            </time>
          ) : (
            <div>&nbsp;</div>
          )
        }
      </div>
    </div>
  );
}
