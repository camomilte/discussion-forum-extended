// Import type
import type { Thread } from "../types/types";

// Define props for ThreadDetail
interface ThreadDetailProps {
  thread: Thread;
}

// Define ThreadDetail component
function ThreadDetail({ thread }: ThreadDetailProps) {

  return (
      <div className="container-post flex flex-col background-secondary">
        <div className="flex thread-info">
          <p>Category: {thread.category}</p>
          <p>{new Date(thread.creationDate).toDateString()}</p>
        </div>
        <h1>{thread.title}</h1>
        <p className="align-start">{thread.description}</p>
        <div className="user-info flex align-end background-primary">
          <img src={thread.creator.picture} alt="user profile picture" className="user-image"/>
          <p>{thread.creator.username}</p> 
        </div>
      </div>
  );
}

export default ThreadDetail;
