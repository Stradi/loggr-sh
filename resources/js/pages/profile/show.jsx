import AppLayout from "@/layouts/app-layout";
import EditProfileDialog from "./edit-profile-dialog";
import FollowButton from "@/components/follow-button.jsx";
import SocialDialog from "@/components/social-dialog.jsx";
import Tabs from "@/pages/profile/tabs.jsx";

export default function Page({
                               auth, user, social = {
    is_following: false,
    followers_count: 0,
    followings_count: 0,
    followers: [],
    followings: []
  }
                             }) {
  return (
    <AppLayout auth={auth}>
      <section className="max-w-3xl divide-y divide-neutral-300 border-r border-neutral-300">
        <header>
          <div className="relative">
            <img
              src={user.cover_image}
              alt="Cover"
              className="h-36 md:h-72 w-full object-cover"
            />
          </div>
          <div className="relative">
            <img
              src={user.avatar}
              alt="Avatar"
              className="border-2 border-white rounded-full w-32 md:w-44 absolute -translate-y-1/2 left-2"
            />
            <div className="flex justify-between ml-[136px] md:ml-[184px] p-2">
              <div className="[&>*]:leading-tight min-w-0">
                {" "}
                <h1 className="truncate text-lg md:text-3xl font-bold">
                  {user.name}
                </h1>
                <p className="truncate text-sm md:text-base text-neutral-600 font-medium">
                  @{user.handle}
                </p>
              </div>
              <div className="flex gap-1 h-fit">
                {auth.user && user.handle === auth.user.handle ? (
                  <EditProfileDialog
                    defaultValues={{
                      name: user.name,
                      bio: user.bio,
                      handle: user.handle,
                    }}
                  />
                ) : (
                  <FollowButton
                    defaultValue={social.is_following}
                    followRoute={route('social.follow', {
                      handle: user.handle
                    })}
                    unfollowRoute={route('social.unfollow', {
                      handle: user.handle
                    })}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 md:mt-2">
            <p className="text-sm md:text-base">{user.bio}</p>
            <div className="space-x-4 text-sm md:text-base">
              <SocialDialog
                initialItems={social.followers.data}
                initialNextPageUrl={social.followers.next_page_url}
                getItemsFromPageData={(page) => page.props.social.followers.data}
                getNextPageUrlFromPageData={(page) => page.props.social.followers.next_page_url}
                dialogTitle={() => `Followers of @${user.handle}`}
                dialogDescription={(count) => `@${user.handle} has ${count} followers.`}
                dialogTrigger={(count) => <span
                  className="text-neutral-600 font-medium hover:underline cursor-pointer">{count} Followers</span>}
                emptyState={<div>Well, @{user.handle} has no followers, yet.</div>}
                resetItemsOnClose
              />
              <SocialDialog
                initialItems={social.followings.data}
                initialNextPageUrl={social.followings.next_page_url}
                getItemsFromPageData={(page) => page.props.social.followings.data}
                getNextPageUrlFromPageData={(page) => page.props.social.followings.next_page_url}
                dialogTitle={() => `Followings of @${user.handle}`}
                dialogDescription={(count) => `@${user.handle} follows ${count} people.`}
                dialogTrigger={(count) => <span
                  className="text-neutral-600 font-medium hover:underline cursor-pointer">{count} Followings</span>}
                emptyState={<div>Well, @{user.handle} hasn't followed anyone, yet.</div>}
                resetItemsOnClose
              />
            </div>
          </div>
        </header>
        <main className="h-full">
          <Tabs handle={user.handle}/>
        </main>
      </section>
    </AppLayout>
  );
}
