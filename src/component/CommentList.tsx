// Imports
import { PropagateLoader } from "react-spinners";
import CommentItem from "./Comment";
import { useEffect, useState } from "react";
import { useComments } from "../context/commentContext";
import type { Thread } from "../models/threads";
import ErrorIcon from '@mui/icons-material/Error';

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
      {error && 
        <div className="border border-red-400 p-3 rounded-lg w-96 md:w-[70%] mx-auto flex mt-5">
          <ErrorIcon className="text-red-400 pe-1 "/><p className="text-red-400">{error}</p>
        </div>}
      {loading &&  
        <div className="flex justify-center items-center h-120">
          <PropagateLoader color="#40b83d"/>
        </div>}
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
