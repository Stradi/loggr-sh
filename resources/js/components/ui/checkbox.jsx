import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { forwardRef } from "react";
import { CheckIcon } from "../icons";

const Checkbox = forwardRef(({ className, disabled, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        "appearance-none h-6 w-6 rounded-lg ring-1 ring-neutral-300 ring-offset-0",
        "transition-[box-shadow] duration-150 text-neutral-800",
        "hover:ring-neutral-600",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600",
        disabled &&
          "opacity-75 cursor-not-allowed ring-neutral-200 hover:ring-neutral-200 text-neutral-500",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={clsx("flex items-center justify-center text-neutral-800")}
      >
        <CheckIcon svgClassName="!w-5 !h-5" stroke="thick" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";
export default Checkbox;
