import AppLayout from "@/layouts/app-layout";

export default function Page({ auth, user }) {
  return (
    <AppLayout auth={auth}>
      <h1>Profile</h1>
      <p>{JSON.stringify(user)}</p>
    </AppLayout>
  );
}
