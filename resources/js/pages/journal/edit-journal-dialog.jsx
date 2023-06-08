import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EditJournalDialog({
  defaultValues = {
    name: "",
    slug: "",
    description: "",
  },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, patch, processing, errors, progress } = useForm({
    name: defaultValues.name,
    slug: defaultValues.slug,
    description: defaultValues.description,
  });

  useEffect(() => {
    if (!isOpen) setData(defaultValues);
  }, [isOpen]);

  function onSubmit(e) {
    e.preventDefault();
    patch(route("journal.update", defaultValues.slug), {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <Dialog
      title="Edit Journal"
      description="Update your journal's name, description and add custom URL to it."
      trigger={<Button variant="outline">Edit</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="New Journal Name"
            disabled={processing}
          />
          {errors.name && <InputError>{errors.name}</InputError>}
        </div>
        <div>
          <Label htmlFor="slug">
            Custom URL (
            <code>/j/{data.slug.toLocaleLowerCase().replace(" ", "-")}</code>)
          </Label>
          <Input
            id="slug"
            type="text"
            value={data.slug}
            onChange={(e) =>
              setData(
                "slug",
                e.target.value.toLocaleLowerCase().replace(" ", "-")
              )
            }
            placeholder="John Doe"
            disabled={processing}
          />
          {errors.slug && <InputError>{errors.slug}</InputError>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="resize-none"
            id="description"
            type="text"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            placeholder="Tell us about yourself"
            disabled={processing}
            rows={3}
          />
          {errors.description && <InputError>{errors.description}</InputError>}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Dialog>
  );
}
