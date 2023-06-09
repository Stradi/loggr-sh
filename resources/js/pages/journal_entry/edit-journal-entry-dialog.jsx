import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditJournalEntryDialog({
  defaultValues = {
    slug: "",
    is_public: "",
  },
  journalSlug,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, patch, processing, errors, progress } = useForm({
    slug: defaultValues.slug,
    is_public: defaultValues.is_public,
  });

  function onSubmit(e) {
    e.preventDefault();
    patch(
      route("journal_entry.update", {
        journal: journalSlug,
        journalEntry: defaultValues.slug,
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
      title="Edit Journal Entry Settings"
      description="Make some final adjustments to your journal entry and publish it."
      trigger={<Button>Edit Settings</Button>}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
      >
        <div>
          <Label htmlFor="slug">Custom URL</Label>
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
            placeholder="my-new-journal-entry"
            disabled={processing}
          />
          {errors.slug && <InputError>{errors.slug}</InputError>}
        </div>
        <div className="!flex-row !gap-2 !items-center">
          <Label htmlFor="is_public">Make it public</Label>
          <Checkbox
            id="is_public"
            checked={data.is_public}
            onCheckedChange={(checked) => {
              setData("is_public", checked);
            }}
          />
          <span className="text-sm text-neutral-500 font-medium">
            {data.is_public
              ? "Anyone can see this journal entry."
              : "Only you can see this journal entry."}
          </span>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Dialog>
  );
}
