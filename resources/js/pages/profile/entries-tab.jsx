import MiniJournalEntry from "@/components/mini-journal-entry/mini-journal-entry.jsx";
import Button from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";

export default function EntriesTab({ handle }) {
  const [entries, setEntries] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    axios
      .get(
        route("profile.entries", {
          handle,
        })
      )
      .then((response) => {
        setNextPageUrl(response.data.next_page_url);
        setEntries(response.data.data);
      });
  }, [handle]);

  return (
    <div>
      {entries.length === 0 && (
        <div className="p-4 text-center text-lg border-b border-neutral-300">
          No entries yet.
        </div>
      )}
      {entries.map((entry) => (
        <MiniJournalEntry key={entry.id} journalEntry={entry} />
      ))}
      {nextPageUrl && (
        <div className="w-full p-2 border-b border-neutral-300">
          <Button
            className="w-full"
            onClick={() => {
              axios.get(nextPageUrl).then((response) => {
                setNextPageUrl(response.data.next_page_url);
                setEntries([...entries, ...response.data.data]);
              });
            }}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
