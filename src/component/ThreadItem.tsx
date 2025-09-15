// Import thread type
import type { Thread } from "../models/threads";

// Define props for ThreadItem
interface ThreadItemProps {
  thread: Thread; // Single thread object
  onSelect: (id: number) => void; // Callback that takes thread id
}

// Define ThreadItem component
function ThreadItem({ thread, onSelect }: ThreadItemProps) {
  return (
   <div onClick={() => onSelect(thread.id)}>
    <p>{thread.createdAt}</p> 
    {thread.resolved && (
      <span>Answered</span>
    )}
    <h3>{thread.header}</h3>
    <p>{thread.text}</p>
    <small>{thread.category}</small>
   </div>
  );
}

export default ThreadItem;
