import Button from "@/components/ui/button.jsx";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function FollowButton({ defaultValue, followRoute, unfollowRoute }) {
  const [isFollowing, setIsFollowing] = useState(defaultValue);

  function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();

    setIsFollowing(true);
    router.post(followRoute, {}, {
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
    router.post(unfollowRoute, {}, {
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
