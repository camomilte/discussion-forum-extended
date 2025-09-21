// Import
import { useState } from "react";
import { useComments } from "../context/commentContext";
import { useUser } from "../context/userContext";
import type { Comment } from "../models/comments";
import type { Thread } from "../models/threads";

// Define props for CommentItem
interface CommentItemProps {
  comment: Comment; // Single comment
  key: number;
  thread: Thread;
}


// Define CommentItem component
function CommentItem({ comment, thread }: CommentItemProps) {
  const { markCommentAsAnswer } = useComments();
  const { user } = useUser();

  const canMark = user?.id === thread.ownerId;

  const [isAnswer, setIsAnswer] = useState(comment.answer);

  const handleMarkAsAnswer = async () => {
    try {
      await markCommentAsAnswer(comment.id);
      setIsAnswer(true);
    } catch (err) {
      setIsAnswer(false);
      console.error("Failed to mark as answer", err);
    }
  };

  
  return (
    <div className="background-gray-200 comment-container flex flex-col">
      <div className="flex flex-row justify-between">
        <p className="thread-info">
          {new Date(comment.createdAt).toDateString()}
        </p>
        {comment.answer && <p>Answer!</p>}

      </div>
      <p className="align-start comment-content">{comment.text}</p>

      {canMark && !comment.answer && (
        <button 
          onClick={handleMarkAsAnswer}
          disabled={isAnswer}
          className={comment.answer ? "btn-disabled" : "btn"}>
          Answer
        </button>
      )}

      <div className="flex user-info background-secondary align-end">
        {/* Show creator's username or anon if none is provided */}
        <p>{comment.owner || "Anon"}</p>
      </div>
      

        
    </div>
  );
}

export default CommentItem;
