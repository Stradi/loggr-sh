import AuthorInfo from "@/components/author-info.jsx";
import LikeButton from "@/components/atoms/like-button.jsx";
import clsx from "clsx";
import {usePage} from "@inertiajs/react";
import ReplyDialog from "@/components/single-journal-entry/reply-dialog.jsx";
import {useState} from "react";

export default function Comment({journalEntryId, comment, isReply = false}) {
  const {props: {auth}} = usePage();

  // TODO: Hide and show replies using a button on the left of the comment.
  const [replies, setReplies] = useState([]);
  const [shownReplies, setShownReplies] = useState([]);

  function fetchReplies() {
    axios.get(route("comment.replies", {
      comment: comment.id
    })).then(response => {
      setReplies(response.data);
      setShownReplies(response.data);
    });
  }

  function likeComment() {

  }

  function unlikeComment() {

  }

  return (
    <div className={
      clsx(
        "pt-4 pb-2 px-4 relative",
        !isReply && "border-b border-neutral-300"
      )
    }>
      {
        isReply && (
          <div className="absolute top-0 -left-4 w-[1px] h-full bg-neutral-300"/>
        )
      }
      <AuthorInfo
        name={comment.user.name}
        handle={comment.user.handle}
        avatar={comment.user.avatar}
        created_at={comment.created_at}
      />
      <div className="ml-12">
        {comment.body}
      </div>
      <div className="flex gap-4 ml-10">
        <LikeButton
          defaultValue={comment.has_liked || false}
          count={comment.likers_count || 0}
          onLike={likeComment}
          onUnlike={unlikeComment}
        />
        <ReplyDialog
          replyCount={comment.replies_count}
          comment={comment}
          authUser={auth.user}
          onReplyCreated={fetchReplies}
        />
      </div>
      {
        (comment.replies_count > 0 && shownReplies.length !== comment.replies_count) && (
          <button
            className="ml-12 text-sm font-medium text-neutral-500 hover:underline hover:text-neutral-700"
            onClick={fetchReplies}
          >
            Show {comment.replies_count} replies
          </button>
        )
      }
      {shownReplies.map(reply => (
        <div className="ml-8" key={reply.id}>
          <Comment
            journalEntryId={journalEntryId}
            comment={reply}
            isReply
          />
        </div>
      ))}
    </div>
  )
}
