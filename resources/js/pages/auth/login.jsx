import Anchor from "@/components/ui/anchor";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import AuthenticationLayout from "@/layouts/authentication-layout";
import { Head, useForm } from "@inertiajs/react";

export default function Page() {
  const { data, setData, post, processing, errors } = useForm({
    handle: "",
    password: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("login"));
  }

  return (
    <>
      <Head title="Login" />
      <AuthenticationLayout className="flex flex-col gap-4">
        <header className="w-full mb-4">
          <h1 className="text-xl text-neutral-700 font-medium">
            Login to your account
          </h1>
        </header>
        <main className="w-full">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
          >
            <div>
              <Label htmlFor="handle">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="handle"
                type="text"
                value={data.handle}
                onChange={(e) => setData("handle", e.target.value)}
                placeholder="jonsnow"
                disabled={processing}
              />
              {errors.handle && <InputError>{errors.handle}</InputError>}
            </div>

            <div>
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                placeholder="**************"
                disabled={processing}
              />
              {errors.password && <InputError>{errors.password} </InputError>}
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
            Forgot your password?{" "}
            <Anchor href={route("password.request")}>Reset it</Anchor>
          </p>
        </footer>
      </AuthenticationLayout>
    </>
  );
}
