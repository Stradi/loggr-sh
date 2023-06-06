import NavigationBar from "./navigation-bar";
import Sidebar from "./sidebar";

export default function AppLayout({ auth, children }) {
  return (
    <section className="flex h-screen">
      <Sidebar>Content</Sidebar>
      <main className="overflow-y-auto">
        <NavigationBar />
        <main className="p-4">{children}</main>
      </main>
    </section>
  );
}
