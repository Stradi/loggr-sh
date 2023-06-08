import AppLayout from "@/layouts/app-layout";

export default function Page({ journalEntry }) {
  return (
    <AppLayout>
      <p>Show Editor!!</p>
      <p>{JSON.stringify(journalEntry)}</p>
    </AppLayout>
  );
}
