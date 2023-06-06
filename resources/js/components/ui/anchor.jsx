import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function Anchor({ className, ...props }) {
  return (
    <Link
      className={clsx(
        "underline font-medium transition duration-150 rounded-md p-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        className
      )}
      {...props}
    />
  );
}
