import clsx from "clsx";

export default function Textarea({className, disabled, autogrow, ...props}) {
  return (
    <textarea
      {...props}
      className={clsx(
        "appearance-none px-4 py-2 rounded-xl ring-1 ring-neutral-300 ring-offset-0",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
        disabled &&
        "opacity-75 cursor-not-allowed ring-neutral-200 hover:ring-neutral-200 text-neutral-500",
        autogrow && "resize-none overflow-hidden min-h-[3rem] max-h-[12rem]",
        className
      )}
      onInput={e => {
        if (autogrow) {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }
      }}
      disabled={disabled}
    />
  );
}
