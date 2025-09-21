// Imports
import { PropagateLoader } from "react-spinners";
import type { Thread } from "../models/threads";
import ThreadItem from "./ThreadItem";
import ErrorIcon from '@mui/icons-material/Error';

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
    return (
      <div className="flex justify-center items-center h-120">
        <PropagateLoader color="#40b83d"/>
      </div>
      
    )
  }
  
  if(error) {
    return (
      <div className="border border-red-400 p-3 rounded-lg w-96 md:w-[70%] mx-auto flex mt-5">
        <ErrorIcon className="text-red-400 pe-1 "/><p className="text-red-400">{error}</p>
      </div>
    )
  }
  
  // If there are no threads display message
  if (threads.length === 0) {
    return <p className="text-gray-500">No threads available</p>;
  }

  return (
     <div className="border-t border-br-background-800 max-w-4xl mx-auto">
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