import FollowButton from "@/components/follow-button.jsx";
import MiniJournalEntry from "@/components/mini-journal-entry/mini-journal-entry";
import MiniProfileButton from "@/components/mini-profile-button";
import SocialDialog from "@/components/social-dialog.jsx";
import AppLayout from "@/layouts/app-layout";
import DeleteJournalButton from "./delete-journal-button";
import EditJournalDialog from "./edit-journal-dialog";

export default function Page({auth, journal, social}) {
  return (
    <AppLayout auth={auth}>
      <section className="max-w-3xl divide-y divide-neutral-300 border-r border-neutral-300">
        <header className="px-4 py-8 text-center space-y-4">
          <h1 className="font-medium text-3xl">{journal.name}</h1>
          <p className="text-lg">{journal.description}</p>
          <div className="text-left max-w-[256px] w-max mx-auto block">
            <MiniProfileButton user={journal.user}/>
          </div>
          <div className="flex gap-4 justify-center">
            <SocialDialog
              initialItems={social.followers.data}
              initialNextPageUrl={social.followers.next_page_url}
              getItemsFromPageData={(page) => page.props.social.followers.data}
              getNextPageUrlFromPageData={(page) =>
                page.props.social.followers.next_page_url
              }
              dialogTitle={() => `Followers of ${journal.name}`}
              dialogDescription={(count) =>
                `${count} people follows ${journal.name} by ${journal.user.name}`
              }
              dialogTrigger={(count) => (
                <span className="text-neutral-600 font-medium hover:underline cursor-pointer">
                  {count} Followers
                </span>
              )}
              emptyState={<div>Well, no one follows {journal.name}, yet.</div>}
              resetItemsOnClose
            />
            <p>
              <span className="font-medium">{journal.entries_count}</span>{" "}
              Entries
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {auth.user && auth.user.id === journal.user.id ? (
              <>
                <EditJournalDialog
                  defaultValues={{
                    name: journal.name,
                    slug: journal.slug,
                    description: journal.description,
                  }}
                />
                <DeleteJournalButton slug={journal.slug}/>
              </>
            ) : (
              <FollowButton
                defaultValue={social.is_following}
                followRoute={route("social.follow_journal", {
                  journal: journal.slug,
                })}
                unfollowRoute={route("social.unfollow_journal", {
                  journal: journal.slug,
                })}
              />
            )}
          </div>
        </header>
        <main>
          {journal.entries.data.length > 0 ? (
            journal.entries.data.map((entry) => (
              <MiniJournalEntry
                key={entry.id}
                journalEntry={{
                  ...entry,
                  journal,
                  user: journal.user,
                }}
              />
            ))
          ) : (
            <p className="text-center py-8">No entries yet.</p>
          )}
        </main>
      </section>
    </AppLayout>
  );
}
