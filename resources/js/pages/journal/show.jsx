import MiniJournalEntry from "@/components/mini-journal-entry/mini-journal-entry";
import MiniProfileButton from "@/components/mini-profile-button";
import Button from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import DeleteJournalButton from "./delete-journal-button";
import EditJournalDialog from "./edit-journal-dialog";

export default function Page({ auth, journal }) {
  return (
    <AppLayout auth={auth}>
      <section className="max-w-3xl divide-y divide-neutral-300 border-r border-neutral-300">
        <header className="px-4 py-8 text-center space-y-4">
          <h1 className="font-medium text-3xl">{journal.name}</h1>
          <p className="text-lg">{journal.description}</p>
          <div className="text-left max-w-[256px] w-max mx-auto block">
            <MiniProfileButton user={journal.user} />
          </div>
          <div className="flex gap-4 justify-center">
            <p>
              <span className="font-medium">69</span> Followers
            </p>
            <p>
              <span className="font-medium">24</span> Entries
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
                <DeleteJournalButton slug={journal.slug} />
              </>
            ) : (
              <Button>Follow</Button>
            )}
          </div>
        </header>
        <main>
          {journal.entries.length > 0 ? (
            journal.entries.map((entry) => (
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
