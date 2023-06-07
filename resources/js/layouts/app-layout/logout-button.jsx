import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function LogoutButton() {
  return (
    <Link
      href={route("logout")}
      as="button"
      method="post"
      className={clsx(
        "px-4 py-2 flex items-center whitespace-nowrap justify-center text-center rounded-xl font-medium text-sm md:text-base",
        "transition-[box-shadow,background-color] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        "ring-1 ring-neutral-300 text-neutral-800 hover:ring-neutral-600 bg-transparent hover:bg-transparent"
      )}
    >
      Logout
    </Link>
  );
}
