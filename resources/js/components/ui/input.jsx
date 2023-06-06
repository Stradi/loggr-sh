import clsx from "clsx";

export default function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={clsx(
        "px-4 py-2 rounded-xl ring-1 ring-neutral-300 ring-offset-0",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        className
      )}
    />
  );
}
