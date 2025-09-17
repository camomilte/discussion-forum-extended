// Imports
import { PropagateLoader } from "react-spinners";
import CommentItem from "./Comment";
import { useEffect } from "react";
import { useComments } from "../context/commentContext";

// Define props for CommentList
interface CommentListProps {
  threadId: number;
}

// Define CommentList component
function CommentList({ threadId }: CommentListProps) {
  const { comments, loadComments, loading, error } = useComments();

  useEffect(() => {
    loadComments(threadId);
  }, [threadId, loadComments]);

  console.log(comments)

  if(loading) {
    return <PropagateLoader />;
  }
  
  if(error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  
  // If there are no threads display message
  if (comments.length === 0) {
    return <p className="text-gray-500">No comments yet</p>;
  }

  return (
    <div>
      {/* Render CommentItem for each comment in Comment array */}
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          />
      ))}
    </div>
  );
}

export default CommentList;
