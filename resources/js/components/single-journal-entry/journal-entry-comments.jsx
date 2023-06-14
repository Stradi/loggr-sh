import {useForm} from "@inertiajs/react";
import Button from "@/components/ui/button.jsx";
import Comment from "./comment.jsx";
import Textarea from "@/components/ui/textarea.jsx";

export default function JournalEntryComments({journalEntry, comments}) {
  const {data, setData, post, processing, errors} = useForm({
    body: "",
    journal_entry_id: journalEntry.id,
    parent_id: null
  });

  function onSubmit(e) {
    e.preventDefault();
    post(
      route("comment.store")
    );
    setData("body", "");
  }

  return (
    <div>
      <div className="p-4 space-y-2">
        <p className="font-medium">Replies ({comments.length})</p>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2"
        >
          <Textarea
            autogrow
            id="comment"
            value={data.body}
            onChange={(e) => setData("body", e.target.value)}
            placeholder="What do you think about this journal entry?"
          />
          <div className="flex justify-between">
            <div></div>
            <Button type="submit">Reply</Button>
          </div>
        </form>
      </div>

      <div className="border-t border-neutral-300">
        {comments.map(comment => (
          <Comment key={comment.id} journalEntryId={journalEntry.id} comment={comment}/>
        ))}
      </div>
    </div>
  )
}
