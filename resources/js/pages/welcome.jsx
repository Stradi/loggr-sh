import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <AppLayout>
        <Head title="Welcome" />
        <div>Welcome to Loggr</div>
      </AppLayout>
    </>
  );
}
