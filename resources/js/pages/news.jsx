import AppLayout from "@/layouts/app-layout/index.js";
import {useEffect, useState} from "react";
import MiniJournalEntry from "@/components/mini-journal-entry/mini-journal-entry.jsx";
import Button from "@/components/ui/button.jsx";

export default function Page({auth}) {
  const [entries, setEntries] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("/news/entries");

  function fetchMore() {
    axios.get(nextPageUrl).then(response => {
      setEntries([...entries, ...response.data.data]);
      setNextPageUrl(response.data.next_page_url);
    });
  }

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-3xl border-r border-b border-neutral-300">
        {
          entries.map((entry, idx) => {
            return (
              <MiniJournalEntry key={entry.id} journalEntry={entry}/>
            )
          })
        }
        <div className="p-4">

          {
            nextPageUrl ? <Button className="w-full" onClick={fetchMore}>Load More</Button> :
              <p className="text-center">
                You've reached the end of the news feed. <br/>
                That's all for now.
              </p>
          }
        </div>
      </div>
    </AppLayout>
  )
}
