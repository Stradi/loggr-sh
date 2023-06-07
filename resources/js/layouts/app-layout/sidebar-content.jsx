import { XIcon } from "@/components/icons";
import useSidebarStore from "@/stores/sidebar-store";
import { Link } from "@inertiajs/react";

export default function SidebarContent() {
  const [setIsOpen] = useSidebarStore((state) => [state.setIsOpen]);

  return (
    <section>
      <header className="h-12 flex justify-between items-center p-4 bg-neutral-900 text-white">
        <Link href="/" className="tracking-tighter font-semibold text-lg">
          Loggr.sh
        </Link>
        <button
          className="md:hidden p-2 text-neutral-500"
          id="close-sidebar-button"
          onClick={() => setIsOpen(false)}
        >
          <XIcon size="sm" stroke="thicker" />
        </button>
      </header>
    </section>
  );
}
