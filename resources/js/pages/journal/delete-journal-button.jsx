import Button from "@/components/ui/button";
import useClickOutside from "@/hooks/use-click-outside";
import { router } from "@inertiajs/react";
import clsx from "clsx";
import { useRef, useState } from "react";

export default function DeleteJournalButton({ slug }) {
  const [isClickedOnce, setIsClickedOnce] = useState(false);
  const buttonRef = useRef(null);

  useClickOutside(buttonRef, () => {
    setIsClickedOnce(false);
  });

  function onClick() {
    if (isClickedOnce) {
      router.delete(route("journal.destroy", slug));
    } else {
      setIsClickedOnce(true);
    }
  }

  return (
    <Button
      variant="outline"
      ref={buttonRef}
      onClick={onClick}
      className={clsx(
        isClickedOnce && "!bg-red-500 !text-white !ring-red-600",
        isClickedOnce && "!hover:bg-red-600 !hover:ring-red-700"
      )}
    >
      {isClickedOnce ? "Are you sure?" : "Delete"}
    </Button>
  );
}
