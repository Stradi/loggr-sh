import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";

export default function ProfileButton() {
  const {
    props: { auth },
  } = usePage();
  return (
    <Link
      href={`/@${auth.user.handle}`}
      className={clsx(
        "flex gap-2 p-2 rounded-xl ring-1 ring-neutral-300",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600"
      )}
    >
      <img
        src={auth.user.avatar}
        alt={`Profile picture of @${auth.user.handle}`}
        className="h-12 aspect-square rounded-full border border-white"
      />
      <div className="min-w-0">
        <p className="truncate font-medium">{auth.user.name}</p>
        <p className="truncate font-medium text-neutral-500 text-sm">
          @{auth.user.handle}
        </p>
      </div>
    </Link>
  );
}
