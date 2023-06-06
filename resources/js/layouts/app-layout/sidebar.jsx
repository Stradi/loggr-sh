import useClickOutside from "@/hooks/use-click-outside";
import useSidebarStore from "@/stores/sidebar-store";
import clsx from "clsx";
import { useRef } from "react";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useSidebarStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, (event) => {
    if (event.target.closest("#close-sidebar-button")) {
      return;
    }

    isOpen && setIsOpen(false);
  });

  return (
    <aside
      ref={sidebarRef}
      className={clsx(
        "w-full max-w-[250px] fixed left-0 h-full z-50",
        "border-r bg-white/70 backdrop-blur-sm border-neutral-300",
        "transition-transform duration-300",
        "md:relative md:left-auto md:top-auto ",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {children}
    </aside>
  );
}
