// Imports
import { PropagateLoader } from "react-spinners";
import type { Thread } from "../models/threads";
import ThreadItem from "./ThreadItem";

// Define props for ThreadList
interface ThreadListProps {
  threads: Thread[];
  onSelect: (id: number) => void; // Callback that takes thread id
  loading?: boolean;
  error?: string | null;
}

// Define ThreadList component
function ThreadList({ onSelect, error, loading, threads }: ThreadListProps) {

  
  if(loading) {
    return <PropagateLoader />;
  }
  
  if(error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  
  // If there are no threads display message
  if (threads.length === 0) {
    return <p className="text-gray-500">No threads available</p>;
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