import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import AuthenticationLayout from "@/layouts/authentication-layout";
import { useForm } from "@inertiajs/react";

export default function Page({ email, token }) {
  const { data, setData, post, processing, errors } = useForm({
    email,
    token,
    password: "",
    password_confirmation: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("password.store"));
  }

  return (
    <AuthenticationLayout className="flex flex-col gap-4">
      <header className="w-full mb-4">
        <h1 className="text-xl text-neutral-700 font-medium">
          Reset your password
        </h1>
        <p className="text-neutral-700">
          Enter your new password to regain access to your account.
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
              disabled={true}
            />
            {errors.email && <InputError>{errors.email} </InputError>}
          </div>
          <div>
            <Label htmlFor="password">
              New Password <span className="text-red-500">*</span>
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
              onChange={(e) => setData("password_confirmation", e.target.value)}
              placeholder="**************"
              disabled={processing}
            />
            {errors.password_confirmation && (
              <InputError>{errors.password_confirmation} </InputError>
            )}
          </div>
          <Button type="submit" disabled={processing}>
            Reset Password
          </Button>
        </form>
      </main>
    </AuthenticationLayout>
  );
}
