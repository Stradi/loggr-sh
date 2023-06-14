import clsx from "clsx";
import {ChatBubbleIcon} from "@/components/icons.jsx";
import {forwardRef} from "react";

const CommentButton = forwardRef(({count, onClick}, ref) => {
  return (
    <button
      ref={ref}
      className="flex gap-2 hover:bg-sky-500/10 p-2 rounded-xl group"
      onClick={onClick}
    >
      <ChatBubbleIcon
        svgClassName={clsx(
          "text-neutral-500 group-hover:text-sky-500",
        )}
      />
      <span
        className={clsx(
          "text-sm font-medium text-neutral-500 group-hover:text-sky-500",
        )}
      >
        {count}
      </span>
    </button>
  )
});

CommentButton.displayName = "CommentButton";
export default CommentButton;
