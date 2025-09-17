// Import
import type { Comment } from "../models/comments";

// Define props for CommentItem
interface CommentItemProps {
  comment: Comment; // Single comment
}


// Define CommentItem component
function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="background-gray-200 comment-container flex flex-col">
      <p className="thread-info align-start">
        {new Date(comment.createdAt).toDateString()}
      </p>
      <p className="align-start comment-content">{comment.text}</p>

      <div className="flex user-info background-secondary align-end">
        {/* Show creator's username or anon if none is provided */}
        <p>{comment.owner || "Anon"}</p>
      </div>
      

        
    </div>
  );
}

export default CommentItem;
