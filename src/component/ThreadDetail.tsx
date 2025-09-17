// Import type
import type { Thread } from "../models/threads";

// Define props for ThreadDetail
interface ThreadDetailProps {
  thread: Thread;
}

// Define ThreadDetail component
function ThreadDetail({ thread }: ThreadDetailProps) {

  console.log(thread.category)

  return (
      <div className="container-post flex flex-col background-secondary">
        <div className="flex thread-info">
          <p>Category: {thread.category}</p>
          <p>{new Date(thread.createdAt).toDateString()}</p>
        </div>
        <h1>{thread.header}</h1>
        <p className="align-start">{thread.text}</p>
        <div className="user-info flex align-end background-primary">
          <p>{thread.owner}</p> 
        </div>
      </div>
  );
}

export default ThreadDetail;
