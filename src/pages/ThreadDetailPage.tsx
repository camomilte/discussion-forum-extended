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
import ErrorIcon from '@mui/icons-material/Error';


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
    return (
      <div className="flex justify-center items-center h-120">
        <PropagateLoader color="#40b83d"/>
      </div>
    )
  }

  if(error) {
    return (
      <div className="border border-red-400 p-3 rounded-lg w-96 md:w-[70%] mx-auto flex mt-5">
        <ErrorIcon className="text-red-400 pe-1 "/><p className="text-red-400">{error}</p>
      </div>
    )
  }

  if(!currentThread) {
    return <p>The thread you're looking for could not be found!</p>
  }

  return (
    <div className="max-w-96 md:max-w-4xl mx-auto py-4">
      <ThreadDetail thread={currentThread}/>
      <div>
        {currentThread && (
          <>
            <CommentList thread={currentThread} />
            <CommentForm threadId={currentThread.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ThreadPage;