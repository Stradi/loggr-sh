import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(
  ({ asChild, variant, className, disabled, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={clsx(
          "px-4 py-2 flex items-center whitespace-nowrap justify-center text-center rounded-xl font-semibold text-neutral-100 text-sm md:text-base",
          "transition-[box-shadow,background-color] duration-150",
          "bg-neutral-900 hover:bg-neutral-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600",
          disabled && "opacity-75 cursor-not-allowed hover:bg-neutral-900",
          variant === "outline" &&
            "ring-1 ring-neutral-300 text-neutral-800 hover:ring-neutral-600 bg-transparent hover:bg-transparent",
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
