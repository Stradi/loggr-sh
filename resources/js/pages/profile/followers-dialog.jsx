import Dialog from "@/components/ui/dialog.jsx";
import {useState} from "react";
import Button from "@/components/ui/button.jsx";
import {router} from "@inertiajs/react";
import SingleSocialProfile from "@/pages/profile/single-social-profile.jsx";

export default function FollowersDialog({handle, followersCount, initialFollowers, initialNextPageUrl}) {
  const [isOpen, setIsOpen] = useState(false);
  const [followers, setFollowers] = useState(initialFollowers);
  const [nextPageUrl, setNextPageUrl] = useState(initialNextPageUrl)

  function loadMore() {
    if (nextPageUrl) {
      router.get(nextPageUrl, {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          setFollowers([...followers, ...page.props.social.followers.data]);
          setNextPageUrl(page.props.social.followers.next_page_url);
        }
      })
    }
  }

  return (
    <Dialog
      title={`Followers of @${handle}`}
      description={`@${handle} has ${followersCount} followers`}
      trigger={
        <span className="text-neutral-600 font-medium hover:underline cursor-pointer">
          {followersCount} Followers
        </span>
      }
      isOpen={isOpen}
      setIsOpen={(value) => {
        if(!value) {
          setFollowers(initialFollowers);
          setNextPageUrl(initialNextPageUrl);
        }
        setIsOpen(value);
      }}
    >
      <div className="space-y-2">
        {
          followers.length === 0 && (
            <>
              <p className="text-center">Well, no one follows <span className="font-medium">@{handle}</span>, yet.</p>
              <p className="text-center">Be the first one!</p>
            </>
          )
        }
        {
          followers.map(follower => (
            <SingleSocialProfile key={follower.id} user={follower}/>
          ))
        }
      </div>
      {
        nextPageUrl && (
          <Button className="mt-2 w-full" onClick={loadMore}>Load More</Button>
        )
      }
    </Dialog>
  )
}
