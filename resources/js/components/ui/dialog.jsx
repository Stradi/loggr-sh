import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Fragment } from "react";
import { XIcon } from "../icons";

export default function Dialog({
  title,
  description,
  children,
  trigger,
  isOpen,
  setIsOpen,
  contentClass,
}) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {trigger || <button className="btn btn-primary">Open Dialog</button>}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay className="fixed z-[40] inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>
          <div className="flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPrimitive.Content
                className={clsx(
                  "relative overflow-y-auto bg-white rounded-xl max-h-[95vh] max-w-[450px] w-full",
                  contentClass
                )}
              >
                <div className="z-10 p-4 border-b border-neutral-300 sticky top-0 bg-white/95">
                  <DialogPrimitive.Close className="absolute right-2 top-2 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-[background-color,color] duration-150">
                    <XIcon />
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Title className="text-xl font-medium">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="text-neutral-700">
                    {description}
                  </DialogPrimitive.Description>
                </div>
                <div className="p-6">{children}</div>
              </DialogPrimitive.Content>
            </Transition.Child>
          </div>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
