import Button from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import EditProfileDialog from "./edit-profile-dialog";

export default function Page({ auth, user }) {
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
                  <Button>Follow</Button>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 md:mt-2">
            <p className="text-sm md:text-base">{user.bio}</p>
            <div className="space-x-4 text-sm md:text-base">
              <span className="text-neutral-600 font-medium">
                {user.followers_count || 0} Followers
              </span>
              <span className="text-neutral-600 font-medium">
                {user.following_count || 0} Following
              </span>
            </div>
          </div>
        </header>
        <main></main>
      </section>
    </AppLayout>
  );
}
