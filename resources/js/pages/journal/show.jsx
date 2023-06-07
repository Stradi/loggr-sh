import AppLayout from "@/layouts/app-layout";

export default function Page({ auth, journal }) {
  return (
    <AppLayout auth={auth}>
      <section className="max-w-3xl divide-y divide-neutral-300 border-r border-neutral-300">
        {JSON.stringify(journal)}
      </section>
    </AppLayout>
  );
}
