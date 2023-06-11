import Button from "@/components/ui/button.jsx";
import {Link, usePage} from "@inertiajs/react";
import FollowButton from "@/pages/profile/follow-button.jsx";

export default function SingleSocialProfile({user, hideFollowButton = false}) {
  const {
    props: {
      auth
    }
  } = usePage()

  return (
    <Button variant="outline" asChild className="!justify-start items-center">
      <Link href={`/@${user.handle}`}>
        <div className="flex min-w-0 gap-2 items-center w-full">
          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full"/>
          <div className="text-left truncate grow">
            <p className="font-medium space-x-1 min-w-0 truncate">
                {user.name}
            </p>
            <p className="text-sm font-normal truncate">@{user.handle}</p>
          </div>
          {
            !hideFollowButton && auth.user && auth.user.handle !== user.handle && (
              <FollowButton targetHandle={user.handle} defaultValue={user.is_following} />
            )
          }
        </div>
      </Link>
    </Button>
  )
}
