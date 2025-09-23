// Import
import { useState } from "react";
import { useComments } from "../context/commentContext";
import { useUser } from "../context/userContext";
import type { Comment } from "../models/comments";
import type { Thread } from "../models/threads";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



// Define props for CommentItem
interface CommentItemProps {
  comment: Comment; // Single comment
  key: number;
  thread: Thread;
}


// Define CommentItem component
function CommentItem({ comment, thread }: CommentItemProps) {
  const { markCommentAsAnswer, comments } = useComments();
  const { user } = useUser();

  const canMark = user?.id === thread.ownerId;

  const [isAnswer, setIsAnswer] = useState(comment.answer);

  const threadHasAnswer = comments.some(c => c.answer);


  const handleMarkAsAnswer = async () => {
    try {
      await markCommentAsAnswer(comment.id);
      setIsAnswer(true);
    } catch (err) {
      setIsAnswer(false);
      console.error("Failed to mark as answer", err);
    }
  };

  console.log(isAnswer)

  
  return (
    <div className="text-br-text my-5">
      
        <div className="flex items-center justify-between opacity-70">
          <div className="flex gap-1">
            <AccountCircleIcon fontSize="medium"/>
            <span className="self-center align-middle">{thread.owner}</span>
          </div>
          <p>{new Date(thread.createdAt).toDateString()}</p> 
        </div>
        
        <div className="border-l border-b ml-2.5 mt-1 border-br-background-800 rounded-bl-lg pb-3 pl-3">
          <div className={`flex justify-between ${comment.answer && "bg-br-accent/20 rounded-md p-3"}`}>
            <p className="text-start">{comment.text}</p>
            {comment.answer && 
              <span className="flex gap-1 text-br-accent">
                <p>Answer</p>
                <CheckCircleIcon fontSize="medium" className="align-bottom"/>
              </span>
            }
            {canMark && !comment.answer && (
              <button 
                onClick={handleMarkAsAnswer}
                disabled={threadHasAnswer}
                className={`rounded-lg py-1 px-5 ${threadHasAnswer ? "bg-br-background-700 text-br-background/50" : "bg-br-accent text-br-background hover:bg-br-accent-600 cursor-pointer"}`}>
                Mark as answer
              </button>
            )}
          </div>
        </div>


      

    </div>
  );
}

export default CommentItem;
