import {useState} from "react";
import {router} from "@inertiajs/react";
import Dialog from "@/components/ui/dialog.jsx";
import SingleSocialProfile from "@/pages/profile/single-social-profile.jsx";
import Button from "@/components/ui/button.jsx";

export default function SocialDialog(
  {
    initialItems = [],
    initialNextPageUrl = null,
    getItemsFromPageData = () => {
      return null
    },
    getNextPageUrlFromPageData = () => {
      return null
    },
    dialogTitle = (count) => {
      return "Items";
    },
    dialogDescription = (count) => {
      return `The count is ${count}.`;
    },
    dialogTrigger = (count) => {
      return <span>Count is {count}</span>;
    },
    emptyState = <div>Empty</div>,

    resetItemsOnClose = false
  }
) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [nextPageUrl, setNextPageUrl] = useState(initialNextPageUrl)

  function loadMore() {
    if (nextPageUrl) {
      router.get(nextPageUrl, {}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          setItems([...items, ...getItemsFromPageData(page)]);
          setNextPageUrl(getNextPageUrlFromPageData(page));
        }
      });
    }
  }

  return (
    <Dialog
      title={dialogTitle(items.length)}
      description={dialogDescription(items.length)}
      trigger={dialogTrigger(items.length)}

      isOpen={isOpen}
      setIsOpen={(value) => {
        if (!value && resetItemsOnClose) {
          setItems(initialItems);
          setNextPageUrl(initialNextPageUrl);
        }
        setIsOpen(value);
      }}
    >
      {items.length === 0 && emptyState}
      {
        items.map(item => (
          <SingleSocialProfile key={item.id} user={item}/>
        ))
      }
      {
        nextPageUrl && (
          <Button className="mt-2 w-full" onClick={loadMore}>Load More</Button>
        )
      }
    </Dialog>
  )
}
