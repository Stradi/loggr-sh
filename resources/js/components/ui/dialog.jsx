import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Fragment, useState } from "react";
import { XIcon } from "../icons";

export default function Dialog({ title, description, children, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger>
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
              <DialogPrimitive.Content className="relative overflow-y-auto bg-white rounded-xl p-4 max-h-[95vh] max-w-[450px] w-full">
                <DialogPrimitive.Close className="absolute right-2 top-2 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-[background-color,color] duration-150">
                  <XIcon />
                </DialogPrimitive.Close>
                <DialogPrimitive.Title className="text-xl font-medium">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-neutral-700 mb-2">
                  {description}
                </DialogPrimitive.Description>
                {children}
              </DialogPrimitive.Content>
            </Transition.Child>
          </div>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
