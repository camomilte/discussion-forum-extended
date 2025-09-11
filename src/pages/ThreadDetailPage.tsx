// Import React router hooks and components
import { Link, useParams } from "react-router-dom";
// Import UI components
import CommentForm from "../component/CommentForm";
import CommentList from "../component/CommentList";
import ThreadDetail from "../component/ThreadDetail";
// Import contexts
import { useComments } from "../context/commentContext";
import { useThread } from "../context/threadContext";


// Define ThreadPage components
function ThreadPage() {
  // Get thread id from route
  const { threadId } = useParams<{ threadId: string }>();

  // Get all threads from context
  const { Threads } = useThread();

  // Get all comments from context
  const { comments } = useComments();

  // Find thread with matching current URL threadId
  const thread = Threads.find(t => t.id === Number(threadId));

  // If no matching thread, show error message and link to home page
  if (!thread) return (
    <div>
      <p className="text-red-500">Thread not found</p>
      <Link to="/">View all threads</Link>
    </div>
  )

  // Filter comments belonging to current threadId
  const threadComments = comments.filter(c => c.threadId === thread.id);

  return (
    <div>
      {thread && <ThreadDetail thread={thread} />}
      <div>
        <CommentForm thread={thread}/>
        <CommentList comments={threadComments} />
        <Link to="/" className="btn">View all threads</Link>
      </div>
    </div>
  );
}

export default ThreadPage;