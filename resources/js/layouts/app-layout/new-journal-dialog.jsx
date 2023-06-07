import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function NewJournalDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    post(route("journal.store"), {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <Dialog
      title="Create a new Journal"
      description="Create a new Journal to start logging about your project."
      trigger={<Button className="w-full">New Journal</Button>}
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
            placeholder="What is the name of your journal?"
            disabled={processing}
          />
          {errors.name && <InputError>{errors.name}</InputError>}
        </div>
        <div>
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            className="resize-none"
            id="description"
            type="text"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            placeholder="What is your journal about, tell us more about it."
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
