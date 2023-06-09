import Button from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export default function LogoutButton() {
  return (
    <Button asChild variant="outline">
      <Link href={route("logout")} as="button" method="post">
        Logout
      </Link>
    </Button>
  );
}
