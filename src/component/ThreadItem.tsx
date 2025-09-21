// Import thread type
import { Link } from "react-router-dom";
import type { Thread } from "../models/threads";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Define props for ThreadItem
interface ThreadItemProps {
  thread: Thread; // Single thread object
  onSelect: (id: number) => void; // Callback that takes thread id
}

// Define ThreadItem component
function ThreadItem({ thread }: ThreadItemProps) {
  return (
    <div className="flex flex-col max-w-4xl p-2 border-b border-br-background-800 shadow-sm mx-auto">
      <div className="hover:bg-br-background-800 p-6 rounded-lg">
        <Link to={`/thread/${thread.id}`} className="text-br-text text-start">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 opacity-70">
              <AccountCircleIcon fontSize="medium"/>
              <span className="self-center align-middle">{thread.owner}</span>
            </div>
            <p>{new Date(thread.createdAt).toDateString()}</p> 
          </div>

         
          <h3 className="my-2 text-2xl font-bold tracking-tight">{thread.header}</h3>
          <p className="my-2">{thread.text}</p>
          <div className="flex justify-between">
            <p className="text-sm opacity-70">{thread.category}</p>
            {thread.resolved && (
              <div className="flex gap-1 text-br-secondary items-center">
                <span>Answered</span>
                <CheckCircleIcon fontSize="small"/>
              </div>
            )}
          </div>
        
        </Link>
      </div>

    </div>
  );
}

export default ThreadItem;
