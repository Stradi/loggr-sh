import * as TabsPrimitive from "@radix-ui/react-tabs";
import EntriesTab from "@/pages/profile/entries-tab.jsx";
import clsx from "clsx";
import Button from "@/components/ui/button.jsx";
import {useState} from "react";

export default function Tabs({handle}) {
  const [value, setValue] = useState('entries');

  return (
    <TabsPrimitive.Root orientation="horizontal" defaultValue="entries" value={value} onValueChange={setValue}>
      <TabsPrimitive.List
        className="flex justify-evenly gap-2 p-2 border-b border-b-neutral-300">
        <Trigger value="entries">Entries</Trigger>
        <Trigger value="journals">Journals</Trigger>
        <Trigger value="about">About</Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content forceMount value="entries" hidden={value !== "entries"}>
        <EntriesTab handle={handle}/>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content forceMount value="journals" hidden={value !== "journals"}>
        <div className="p-4">Journals</div>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content forceMount value="about" hidden={value !== "about"}>
        <div className="p-4">About</div>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  )
}

function Trigger({className, value, children, ...props}) {
  return (
    <Button asChild variant="outline">

      <TabsPrimitive.Trigger
        value={value}
        className={clsx(
          "w-full !font-normal",
          "data-[state='active']:bg-neutral-100 data-[state='active']:!font-medium data-[state='active']:ring-neutral-600",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    </Button>
  )
}
