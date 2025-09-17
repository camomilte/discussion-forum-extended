// Imports
import { PropagateLoader } from "react-spinners";
import CommentItem from "./Comment";
import { useEffect, useState } from "react";
import { useComments } from "../context/commentContext";

// Define props for CommentList
interface CommentListProps {
  threadId: number;
}

// Define CommentList component
function CommentList({ threadId }: CommentListProps) {
  const { comments, loadComments } = useComments();
  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);
  

useEffect(() => {
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      await loadComments(threadId);
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false); 
    }
  };

  fetchComments();
}, [threadId, loadComments]);

  return (
    <div>
      {/* Render CommentItem for each comment in Comment array */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <PropagateLoader />}
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          />
      ))}
    </div>
  );
}

export default CommentList;
