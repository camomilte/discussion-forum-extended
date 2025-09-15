// Imports
import { useThread } from "../context/threadContext";
import type { Thread } from "../models/threads";
import ThreadItem from "./ThreadItem";

// Define props for ThreadList
interface ThreadListProps {
  threads: Thread[];
  onSelect: (id: number) => void; // Callback that takes thread id
}

// Define ThreadList component
function ThreadList({ onSelect }: ThreadListProps) {
  // Get all threads from context
  const { threads } = useThread();

  // If there are no threads display message
  if (threads.length === 0) {
    return <p className="text-gray-500">No threads yet</p>;
  }

  return (
     <div >
      {/* Render ThreadItem for each thread in Thread array */}
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          onSelect={onSelect} // Pass down callback
        />
      ))}
    </div>
  );
}

export default ThreadList;