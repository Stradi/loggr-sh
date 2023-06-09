import { Link } from "@inertiajs/react";
import Button from "./ui/button";

export default function MiniProfileButton({ user }) {
  return (
    <Button asChild variant="outline" className="!gap-1 !p-1">
      <Link href={`/@${user.handle}`}>
        <img
          src={user.avatar}
          alt={`Profile picture of @${user.handle}`}
          className="w-6 h-6 rounded-full"
        />
        <p className="font-medium truncate">{user.name}</p>
        <p className="text-gray-600">@{user.handle}</p>
      </Link>
    </Button>
  );
}
