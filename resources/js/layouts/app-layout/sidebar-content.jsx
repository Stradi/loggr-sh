import { XIcon } from "@/components/icons";
import Button from "@/components/ui/button";
import useSidebarStore from "@/stores/sidebar-store";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import LogoutButton from "./logout-button";
import NewJournalDialog from "./new-journal-dialog";
import ProfileButton from "./profile-button";

export default function SidebarContent() {
  const [setIsOpen] = useSidebarStore((state) => [state.setIsOpen]);

  const {
    props: { auth },
  } = usePage();

  return (
    <section className="h-full">
      <header className="h-12 flex justify-between items-center p-4 bg-neutral-900 text-white">
        <Link
          href="/"
          className={clsx(
            "tracking-tighter font-semibold text-lg",
            "focus-visible:outline-none"
          )}
        >
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
      <main className="p-4 flex flex-col h-[calc(100%-48px)]">
        <div className="grow"></div>
        {auth && auth.user ? (
          <div className="flex flex-col gap-2">
            <NewJournalDialog />
            <ProfileButton user={auth.user} />
            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href="/login" as="button">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        )}
      </main>
    </section>
  );
}
