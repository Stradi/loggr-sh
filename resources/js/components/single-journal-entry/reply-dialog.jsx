import CommentButton from "@/components/atoms/comment-button.jsx";
import AuthorInfo from "@/components/author-info.jsx";
import Textarea from "@/components/ui/textarea.jsx";
import Button from "@/components/ui/button.jsx";
import Dialog from "@/components/ui/dialog.jsx";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function ReplyDialog({replyCount, comment, authUser, onReplyCreated}) {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const {data, setData, post} = useForm({
    body: "",
    journal_entry_id: comment.journal_entry_id,
    parent_id: comment.id,
  });

  function onReply(e) {
    e.preventDefault();
    e.stopPropagation();
    post(route("comment.store"), {
      onSuccess: () => {
        setData("body", "");
        setIsCommentDialogOpen(false);
        onReplyCreated && onReplyCreated(data.body);
      }
    })
  }

  return (
    <Dialog
      title={`Reply`}
      isOpen={isCommentDialogOpen}
      setIsOpen={setIsCommentDialogOpen}
      trigger={
        <CommentButton
          count={replyCount || 0}
        />
      }
    >
      <div className="space-y-8 [&>*]:space-y-1">
        <div>
          <AuthorInfo
            name={comment.user.name}
            handle={comment.user.handle}
            avatar={comment.user.avatar}
            created_at={comment.created_at}
          />
          <div className="ml-12">
            {comment.body}
          </div>
        </div>
        <div>
          <AuthorInfo
            name={authUser.name}
            handle={authUser.handle}
            avatar={authUser.avatar}
            created_at={new Date()}
          />
          <form className="ml-12 space-y-2" onSubmit={onReply}>
            <Textarea
              name="body"
              placeholder="Write a reply..."
              autogrow
              className="w-full"
              value={data.body}
              onChange={e => setData("body", e.target.value)}
            />
            <Button className="ml-auto" type="submit">Reply</Button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}
