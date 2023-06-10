import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "../icons";

// TODO: Make it work with @headlessui transition component
export default function Select({
  placeholder = "Select an option",
  items = [],
  ...props
}) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className={clsx(
          "appearance-none grow flex px-4 py-2 items-center justify-between rounded-xl ring-1 ring-neutral-300",
          "transition-[box-shadow] duration-150 text-neutral-800",
          "hover:ring-neutral-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-600"
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="text-neutral-500">
          <ChevronDownIcon size="sm" stroke="thick" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal id="portal">
        <SelectPrimitive.Content
          className={clsx(
            "relative z-50 h-full overflow-hidden rounded-xl ring-1 ring-neutral-300 bg-white shadow-md"
          )}
          position="popper"
        >
          <SelectPrimitive.Viewport className="p-1.5 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

function SelectItem({ value, children }) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-1.5 text-neutral-600 outline-none focus:text-neutral-800 focus:bg-neutral-200 transition duration-100"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center justify-center">
        <CheckIcon size="sm" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
