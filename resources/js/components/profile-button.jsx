import { Link, usePage } from "@inertiajs/react";
import Button from "./ui/button";

export default function ProfileButton() {
  const {
    props: { auth },
  } = usePage();
  return (
    <Button asChild variant="outline" className="!justify-start !p-1.5 gap-2">
      <Link href={`/@${auth.user.handle}`}>
        <img
          src={auth.user.avatar}
          alt={`Profile picture of @${auth.user.handle}`}
          className="h-12 aspect-square rounded-full border border-white"
        />
        <div className="min-w-0">
          <p className="truncate font-medium">{auth.user.name}</p>
          <p className="truncate font-medium text-neutral-500 text-sm text-left">
            @{auth.user.handle}
          </p>
        </div>
      </Link>
    </Button>
  );
}
