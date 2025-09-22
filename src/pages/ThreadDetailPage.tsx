// Import React router hooks and components
import { Link, useParams } from "react-router-dom";
// Import UI components
import CommentForm from "../component/CommentForm";
/* import CommentList from "../component/CommentList"; */
import ThreadDetail from "../component/ThreadDetail";

import { PropagateLoader } from "react-spinners";
import { useEffect } from "react";
import { useThread } from "../context/threadContext";
import CommentList from "../component/CommentList";


// Define ThreadPage components
function ThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const { currentThread, getThread, loading, error } = useThread();

  useEffect(() => {
    if (threadId) {
      getThread(Number(threadId));
    }
  }, [threadId, getThread]);

  if(loading) {
    return <PropagateLoader />;
  }

  if(error) {
    return <p>{error}</p>
  }

  if(!currentThread) {
    return <p>The thread you're looking for could not be found!</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <ThreadDetail thread={currentThread}/>
      <div>
        {currentThread && (
          <>
            <CommentList thread={currentThread} />
            <CommentForm threadId={currentThread.id} />
          </>
        )}
      </div>
      <Link to="/" className="w-full p-2 bg-brand text-br-background rounded-lg hover:bg-brand-300">View all threads</Link>
    </div>
  );
}

export default ThreadPage;