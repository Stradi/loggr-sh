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
              src="https://picsum.photos/1024/512"
              alt="Cover"
              className="h-32 md:h-64 w-full object-cover"
            />
            <img
              //------------------------v Make this a placeholder image
              src={`${user.avatar}` || "https://picsum.photos/512"}
              alt="Avatar"
              className="w-24 md:w-40 aspect-square absolute -bottom-14 rounded-full border-2 border-white left-2 md:left-4"
            />
          </div>
          <div className="ml-28 md:ml-44 flex justify-between mt-1 mr-1">
            <div className="[&>*]:leading-tight">
              {" "}
              <h1 className="text-lg md:text-2xl font-medium">
                {user.name || "John Doe"}
              </h1>
              <p className="text-sm md:text-base text-neutral-600 font-medium">
                @{user.handle}
              </p>
            </div>
            <div className="flex gap-1">
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
          <div className="p-4 space-y-2">
            <p className="text-sm md:text-base">
              {user.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies elit fringilla mi semper placerat. Curabitur ex risus, maximus non viverra sed, dictum porta tellus."}
            </p>
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
