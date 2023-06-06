import NavigationBar from "./navigation-bar";
import Sidebar from "./sidebar";
import SidebarContent from "./sidebar-content";

export default function AppLayout({ auth, children }) {
  return (
    <section className="flex h-screen">
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <main className="overflow-y-auto">
        <NavigationBar />
        <main className="p-4">{children}</main>
      </main>
    </section>
  );
}
