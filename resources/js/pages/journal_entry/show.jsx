import AppLayout from "@/layouts/app-layout";

export default function Page({ journal, journalEntry }) {
  return (
    <AppLayout>
      <p>{JSON.stringify(journalEntry)}</p>
    </AppLayout>
  );
}
