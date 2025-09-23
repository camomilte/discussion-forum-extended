// Import type
import type { Thread } from "../models/threads";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



// Define props for ThreadDetail
interface ThreadDetailProps {
  thread: Thread;
}

// Define ThreadDetail component
function ThreadDetail({ thread }: ThreadDetailProps) {
  console.log(thread)

  return (
      <div className="text-br-text py-6 border-b border-br-background-800 text-start">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-br-accent">
            <AccountCircleIcon fontSize="medium"/>
            <span className="self-center align-middle">{thread.owner}</span>
          </div>
          <p>{new Date(thread.createdAt).toDateString()}</p> 
        </div>
        <div className="py-3">
          <h1 className="my-2 text-2xl font-bold tracking-tight">{thread.header}</h1>
          <p className="align-start">{thread.text}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm opacity-70">Category: {thread.category}</p>
          {thread.resolved && (
            <div className="flex gap-1 text-br-secondary items-center">
              <span>Answered</span>
              <CheckCircleIcon fontSize="small"/>
            </div>
          )}
        </div>
      </div>
  );
}

export default ThreadDetail;
