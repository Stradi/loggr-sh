import { Link } from "@inertiajs/react";

export default function SidebarContent() {
  return (
    <div>
      <div
        aria-label="Logo"
        className="h-12 flex items-center p-4 bg-neutral-900 text-white"
      >
        <Link href="/" className="tracking-tighter font-semibold text-lg">
          Loggr.sh
        </Link>
      </div>
    </div>
  );
}
