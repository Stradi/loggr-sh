import Anchor from "@/components/ui/anchor";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import AuthenticationLayout from "@/layouts/authentication-layout";
import { Head, useForm } from "@inertiajs/react";

export default function Page() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("password.email"));
  }

  return (
    <>
      <Head title="Forgot Password" />
      <AuthenticationLayout className="flex flex-col gap-4">
        <header className="w-full mb-4">
          <h1 className="text-xl text-neutral-700 font-medium">
            Reset your password
          </h1>
          <p className="text-neutral-700">
            Enter your email and we will send you a link to reset your password.
          </p>
        </header>
        <main className="w-full">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
          >
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="jon@snow.com"
                processing={processing}
              />
              {errors.email && <InputError>{errors.email} </InputError>}
            </div>
            <Button type="submit" disabled={processing}>
              Login
            </Button>
          </form>
        </main>

        <footer className="w-full text-center text-sm space-y-2">
          <p className="text-neutral-700">
            Don't have an account?{" "}
            <Anchor href={route("register")}>Register</Anchor>
          </p>
          <p className="text-neutral-700">
            Alread have an account? <Anchor href={route("login")}>Login</Anchor>
          </p>
        </footer>
      </AuthenticationLayout>
    </>
  );
}
