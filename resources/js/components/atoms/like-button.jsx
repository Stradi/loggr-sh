import {HeartIcon} from "@/components/icons.jsx";
import clsx from "clsx";
import {useState} from "react";

export default function LikeButton({count, defaultValue, onLike, onUnlike}) {
  const [liked, setLiked] = useState(defaultValue);

  return (
    <button
      className="flex gap-2 hover:bg-red-500/10 p-2 rounded-xl group"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (liked) {
          setLiked(false);
          onUnlike();
        } else {
          setLiked(true);
          onLike();
        }
      }}
    >
      <HeartIcon
        svgClassName={
          clsx(
            "text-neutral-500 group-hover:text-red-500",
            liked && "fill-red-500 text-red-500"
          )}
      />
      <span className={
        clsx(
          "text-sm font-medium text-neutral-500 group-hover:text-red-500",
          liked && "text-red-500"
        )
      }>
        {count}
      </span>
    </button>
  )
}
