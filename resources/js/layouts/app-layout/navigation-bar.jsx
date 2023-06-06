import useSidebarStore from "@/stores/sidebar-store";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useSidebarStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  return (
    <nav className="sticky top-0 border-b bg-white/70 backdrop-blur-sm border-neutral-300 h-12">
      <div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
    </nav>
  );
}
