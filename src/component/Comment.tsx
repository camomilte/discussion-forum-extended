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
  const { setCommentAnswerState } = useComments();
  const { user } = useUser();

  const canMark = user?.id === thread.ownerId;




  const handleMarkAsAnswer = async () => {
    try {
      await setCommentAnswerState(comment.id, !comment.answer);
    } catch (err) {
      console.error("Failed to mark as answer", err);
    }
  };

  return (
    <div className="text-br-text my-5">
      
        <div className="flex items-center justify-between opacity-70">
          <div className="flex gap-1">
            <AccountCircleIcon fontSize="medium"/>
            <span className="self-center align-middle">{comment.owner}</span>
          </div>
          <p>{new Date(comment.createdAt).toDateString()}</p> 
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
            {canMark && (
              <button 
                onClick={handleMarkAsAnswer}
                className="rounded-lg py-1 px-5 bg-br-accent text-br-background hover:bg-br-accent-600 cursor-pointer">
                {comment.answer ? "Unmark as answer" : "Mark as answer"}
              </button>
            )}
          </div>
        </div>


      

    </div>
  );
}

export default CommentItem;
