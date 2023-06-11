import Dialog from "@/components/ui/dialog.jsx";
import {useState} from "react";
import Button from "@/components/ui/button.jsx";
import {router} from "@inertiajs/react";
import SingleSocialProfile from "@/pages/profile/single-social-profile.jsx";

export default function FollowingsDialog({handle, followingsCount, initialFollowings, initialNextPageUrl}) {
  const [isOpen, setIsOpen] = useState(false);
  const [followings, setFollowings] = useState(initialFollowings);
  const [nextPageUrl, setNextPageUrl] = useState(initialNextPageUrl)

  function loadMore() {
    if (nextPageUrl) {
      router.get(nextPageUrl, {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          setFollowings([...followings, ...page.props.social.followings.data]);
          setNextPageUrl(page.props.social.followings.next_page_url);
        }
      })
    }
  }

  return (
    <Dialog
      title={`Followings of @${handle}`}
      description={`@${handle} follows ${followingsCount} people.`}
      trigger={
        <span className="text-neutral-600 font-medium hover:underline cursor-pointer">
          {followingsCount} Followings
        </span>
      }
      isOpen={isOpen}
      setIsOpen={(value) => {
        if(!value) {
          setFollowings(initialFollowings);
          setNextPageUrl(initialNextPageUrl);
        }
        setIsOpen(value);
      }}
    >
      <div className="space-y-2">
        {
          followings.length === 0 && (
            <p className="text-center">Well, <span className="font-medium">@{handle}</span> doesn't follow anyone, yet.</p>
          )
        }
        {
          followings.map(following => (
            <SingleSocialProfile key={following.id} user={following} />
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
