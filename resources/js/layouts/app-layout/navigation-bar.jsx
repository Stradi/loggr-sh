import { CloseSidebarIcon, OpenSidebarIcon } from "@/components/icons";
import useSidebarStore from "@/stores/sidebar-store";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useSidebarStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  return (
    <nav className="sticky top-0 border-b bg-white/70 backdrop-blur-sm border-neutral-300 h-12">
      <div className="flex items-center p-1 h-full justify-between">
        <div></div>
        <button
          id="close-sidebar-button"
          className="md:hidden text-neutral-500"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <CloseSidebarIcon /> : <OpenSidebarIcon />}
        </button>
      </div>
    </nav>
  );
}
