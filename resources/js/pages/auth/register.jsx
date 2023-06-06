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
    email: "",
    password: "",
    password_confirmation: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("register"));
  }

  return (
    <>
      <Head title="Register" />
      <AuthenticationLayout className="flex flex-col gap-4">
        <header className="w-full mb-4">
          <h1 className="text-xl text-neutral-700 font-medium">
            Create your account
          </h1>
          <p className="text-neutral-700">
            Start writing and connect with same minded people.
          </p>
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
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="jon@snow.com"
                disabled={processing}
              />
              {errors.email && <InputError>{errors.email} </InputError>}
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
            <div>
              <Label htmlFor="password_confirmation">
                Password Confirmation <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                placeholder="**************"
                disabled={processing}
              />
              {errors.password_confirmation && (
                <InputError>{errors.password_confirmation} </InputError>
              )}
            </div>
            <Button type="submit" disabled={processing}>
              Register
            </Button>
          </form>
        </main>

        <footer className="w-full text-center text-sm space-y-2">
          <p className="text-neutral-700">
            Already have an account?{" "}
            <Anchor href={route("login")}>Login</Anchor>
          </p>
        </footer>
      </AuthenticationLayout>
    </>
  );
}
