import Button from "@/components/ui/button.jsx";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function FollowButton({ targetHandle, defaultValue }) {
  const [isFollowing, setIsFollowing] = useState(defaultValue);

  function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();

    setIsFollowing(true);
    router.post(route("social.follow", {
      handle: targetHandle
    }), {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setIsFollowing(true);
      }
    });
  }

  function handleUnfollow(e) {
    e.stopPropagation();
    e.preventDefault();

    setIsFollowing(false);
    router.post(route("social.unfollow", {
      handle: targetHandle
    }), {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setIsFollowing(false);
      }
    });
  }

  return (
    <Button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      variant={isFollowing && "outline"}
    >
      {
        isFollowing ? "Unfollow" : "Follow"
      }
    </Button>
  )
}
