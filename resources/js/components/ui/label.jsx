import clsx from "clsx";

export default function Label({ className, ...props }) {
  return (
    <label
      className={clsx("text-sm font-medium text-neutral-700 mb-1", className)}
      {...props}
    />
  );
}
