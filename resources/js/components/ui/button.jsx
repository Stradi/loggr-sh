import clsx from "clsx";

export default function Button({ className, disabled, ...props }) {
  return (
    <button
      className={clsx(
        "px-4 py-2 flex items-center justify-center text-center rounded-xl font-semibold text-neutral-100 text-sm md:text-base",
        "transition-[box-shadow,background-color] duration-150",
        "bg-neutral-900 hover:bg-neutral-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        disabled && "opacity-75 cursor-not-allowed hover:bg-neutral-900",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
