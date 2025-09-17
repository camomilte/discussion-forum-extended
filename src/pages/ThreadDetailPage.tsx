// Import React router hooks and components
import { Link, useParams } from "react-router-dom";
// Import UI components
import CommentForm from "../component/CommentForm";
/* import CommentList from "../component/CommentList"; */
import ThreadDetail from "../component/ThreadDetail";

import { PropagateLoader } from "react-spinners";
import { useEffect } from "react";
import { useThread } from "../context/threadContext";


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
        <CommentForm thread={currentThread}/>
 {/*        <CommentList comments={threadComments} /> */}
        <Link to="/" className="btn">View all threads</Link>
      </div>
    </div>
  );
}

export default ThreadPage;