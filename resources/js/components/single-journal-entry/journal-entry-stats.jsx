import clsx from "clsx";
import { useState } from "react";
import { ChatBubbleIcon, HeartIcon } from "../icons";

export default function JournalEntryStats({ journalEntry }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);

  return (
    <div className="flex gap-2">
      <button
        className="flex gap-2 hover:bg-red-500/10 p-2 rounded-xl group"
        onClick={() => setHasLiked(!hasLiked)}
      >
        <HeartIcon
          svgClassName={clsx(
            "text-neutral-500 group-hover:text-red-500",
            hasLiked && "fill-red-500 text-red-500"
          )}
        />
        <span
          className={clsx(
            "text-sm font-medium text-neutral-500 group-hover:text-red-500",
            hasLiked && "text-red-500"
          )}
        >
          {/* {journalEntry.like_count} */} 42
        </span>
      </button>
      <button
        className="flex gap-2 hover:bg-sky-500/10 p-2 rounded-xl group"
        onClick={() => setHasCommented(!hasCommented)}
      >
        <ChatBubbleIcon
          svgClassName={clsx(
            "text-neutral-500 group-hover:text-sky-500",
            hasCommented && "fill-sky-500 text-sky-500"
          )}
        />
        <span
          className={clsx(
            "text-sm font-medium text-neutral-500 group-hover:text-sky-500",
            hasCommented && "text-sky-500"
          )}
        >
          {/* {journalEntry.comment_count} */} 21
        </span>
      </button>
    </div>
  );
}
