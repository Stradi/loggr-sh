import SingleJournal from "@/components/single-journal.jsx";
import Button from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";

export default function JournalsTab({ handle }) {
  const [journals, setJournals] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    axios
      .get(
        route("profile.journals", {
          handle,
        })
      )
      .then((response) => {
        setNextPageUrl(response.data.next_page_url);
        setJournals(response.data.data);
      });
  }, [handle]);

  return (
    <div>
      {journals.length === 0 && (
        <div className="p-4 text-center text-lg border-b border-neutral-300">
          No journals yet.
        </div>
      )}
      {journals.map((journal) => (
        <SingleJournal key={journal.id} journal={journal} />
      ))}
      {nextPageUrl && (
        <div className="w-full p-2 border-b border-neutral-300">
          <Button
            className="w-full"
            onClick={() => {
              axios.get(nextPageUrl).then((response) => {
                setNextPageUrl(response.data.next_page_url);
                setJournals([...journals, ...response.data.data]);
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
