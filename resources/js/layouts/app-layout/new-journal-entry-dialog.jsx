import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function NewJournalEntryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    props: { auth },
  } = usePage();

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    journal: "loggr-sh",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("journal_entry.store", data.journal), {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <Dialog
      title="Create a new Entry"
      description="Create a new entry in your journal and start logging your progress, thoughts, and ideas."
      trigger={<Button className="w-full">New Entry</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1"
      >
        <div>
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="What is the title of your entry?"
            disabled={processing}
          />
          {errors.name && <InputError>{errors.name}</InputError>}
        </div>
        <div className="!flex-row items-center !gap-4">
          <Label htmlFor="journal">
            Journal <span className="text-red-500">*</span>
          </Label>
          <Select
            placeholder="Select a journal"
            items={auth.user.journals.map((journal) => ({
              value: journal.slug,
              label: `${journal.name} (${journal.slug})`,
            }))}
            value={data.journal}
            onValueChange={(value) => setData("journal", value)}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Dialog>
  );
}
