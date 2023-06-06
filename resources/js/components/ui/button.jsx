import clsx from "clsx";

export default function Button({ className, disabled, ...props }) {
  return (
    <button
      className={clsx(
        "p-2 flex items-center justify-center leading-loose text-center rounded-xl font-semibold text-neutral-100",
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
