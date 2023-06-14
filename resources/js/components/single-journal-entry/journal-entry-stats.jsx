import {router} from "@inertiajs/react";
import {useState} from "react";
import LikeButton from "@/components/atoms/like-button.jsx";
import CommentButton from "@/components/atoms/comment-button.jsx";

export default function JournalEntryStats({journalEntry}) {
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
      }
    );
  }

  return (
    <div className="flex gap-2">
      <LikeButton
        count={journalEntry.likers_count}
        defaultValue={journalEntry.has_liked}
        onLike={likeEntry}
        onUnlike={unlikeEntry}
      />
      <CommentButton
        count={journalEntry.comments_count || 0}
      />
    </div>
  );
}
