// Imports
import { PropagateLoader } from "react-spinners";
import CommentItem from "./Comment";
import { useEffect, useState } from "react";
import { useComments } from "../context/commentContext";
import type { Thread } from "../models/threads";

// Define props for CommentList
interface CommentListProps {
  thread: Thread;
}

// Define CommentList component
function CommentList({ thread }: CommentListProps) {
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
      await loadComments(thread.id);
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false); 
    }
  };

  fetchComments();
}, [thread.id, loadComments]);

  return (
    <div>
      {/* Render CommentItem for each comment in Comment array */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <PropagateLoader />}
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          thread={thread}
          />
      ))}
    </div>
  );
}

export default CommentList;
