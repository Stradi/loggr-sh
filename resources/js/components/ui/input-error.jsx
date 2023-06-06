import clsx from "clsx";

export default function InputError({ className, children, ...rest }) {
  return (
    <span
      className={clsx("text-sm font-medium text-red-500", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
