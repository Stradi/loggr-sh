import Button from "@/components/ui/button";
import AuthenticationLayout from "@/layouts/authentication-layout";
import { useForm } from "@inertiajs/react";

export default function Page({ status }) {
  const { post, processing } = useForm({});

  function onSubmit(e) {
    e.preventDefault();
    post(route("verification.send"));
  }

  return (
    <AuthenticationLayout className="flex flex-col gap-4">
      <header className="w-full space-y-2">
        <h1 className="text-xl text-neutral-700 font-medium">
          Before you get started...
        </h1>
        <p className="text-neutral-700">
          Hey, we just need to make sure you're a real person, and not a robot.
          Can you prove this by clicking the link we just emailed to you?
        </p>
        <p className="text-neutral-700">
          If you didn't receive the email, we will gladly send you another. Just
          click the button below.
        </p>
      </header>
      <main className="space-y-2 w-full">
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            disabled={processing || status === "verification-link-sent"}
            className="w-full"
          >
            Resend Verification Email
          </Button>
        </form>
        {status === "verification-link-sent" && (
          <p className="font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </p>
        )}
      </main>
    </AuthenticationLayout>
  );
}
