import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function MiniProfileButton({ user }) {
  return (
    <Link
      href={`/@${user.handle}`}
      className={clsx(
        "min-w-0 flex gap-1 ring-1 ring-neutral-300 rounded-xl p-1",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600"
      )}
    >
      <img
        src={user.avatar}
        alt={`Profile picture of @${user.handle}`}
        className="w-6 h-6 rounded-full"
      />
      <p className="font-medium truncate">{user.name}</p>
      <p className="text-gray-600">@{user.handle}</p>
    </Link>
  );
}
