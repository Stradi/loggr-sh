import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EditProfileDialog({
  defaultValues = {
    name: "",
    bio: "",
  },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, post, processing, errors, progress } = useForm({
    name: defaultValues.name,
    bio: defaultValues.bio,
    avatar: undefined,
    handle: defaultValues.handle,
  });

  useEffect(() => {
    if (!isOpen) setData(defaultValues);
  }, [isOpen]);

  function onSubmit(e) {
    e.preventDefault();
    post(
      route("profile.update", {
        handle: data.handle,
      }),
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  }

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Edit Profile"
      description="Update your profile information"
      trigger={<Button>Edit Profile</Button>}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
      >
        <input type="hidden" name="_method" value="PUT" />
        <input type="hidden" name="handle" value="batin" />
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            id="avatar"
            type="file"
            files={data.avatar}
            onChange={(e) => setData("avatar", e.target.files[0])}
            disabled={processing}
          />
          {errors.avatar && <InputError>{errors.avatar}</InputError>}
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="John Doe"
            disabled={processing}
          />
          {errors.name && <InputError>{errors.name}</InputError>}
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            className="resize-none"
            id="bio"
            type="text"
            value={data.bio}
            onChange={(e) => setData("bio", e.target.value)}
            placeholder="Tell us about yourself"
            disabled={processing}
            rows={3}
          />
          {errors.bio && <InputError>{errors.bio}</InputError>}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Dialog>
  );
}
