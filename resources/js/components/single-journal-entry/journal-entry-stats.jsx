import { router } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import { ChatBubbleIcon, HeartIcon } from "../icons";

export default function JournalEntryStats({ journalEntry }) {
  const [liked, setLiked] = useState(journalEntry.has_liked);
  const [hasCommented, setHasCommented] = useState(false);

  function likeEntry() {
    router.post(
      route("social.like_journal_entry", {
        journal: journalEntry.journal.slug,
        journalEntry: journalEntry.slug,
      }),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setLiked(true);
        },
      }
    );
  }

  function unlikeEntry() {
    router.post(
      route("social.unlike_journal_entry", {
        journal: journalEntry.journal.slug,
        journalEntry: journalEntry.slug,
      }),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setLiked(false);
        },
      }
    );
  }

  return (
    <div className="flex gap-2">
      <button
        className="flex gap-2 hover:bg-red-500/10 p-2 rounded-xl group"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          if (liked) {
            setLiked(false);
            unlikeEntry();
          } else {
            setLiked(true);
            likeEntry();
          }
        }}
      >
        <HeartIcon
          svgClassName={clsx(
            "text-neutral-500 group-hover:text-red-500",
            liked && "fill-red-500 text-red-500"
          )}
        />
        <span
          className={clsx(
            "text-sm font-medium text-neutral-500 group-hover:text-red-500",
            liked && "text-red-500"
          )}
        >
          {journalEntry.likers_count}
        </span>
      </button>
      <button
        className="flex gap-2 hover:bg-sky-500/10 p-2 rounded-xl group"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setHasCommented(!hasCommented);
        }}
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
