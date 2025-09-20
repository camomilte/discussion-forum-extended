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
    <div>
      <ThreadDetail thread={currentThread}/>
      <div>
        <CommentList threadId={currentThread.id} />
        <CommentForm threadId={currentThread.id}/>
        <div className="mt-3">
          <Link to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">View all threads</Link>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;