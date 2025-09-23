// Imports
import React, { useEffect, useState } from "react";
import { useComments } from "../context/commentContext";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";

// Define props for CommentList
interface CommentFormProps {
  threadId: number;
}

// Define the CommentForm component
function CommentForm({ threadId }: CommentFormProps) {
  // Destructure comment functions from context
  const { addComment } = useComments();
  // States to store input fields
  const [text, setText] = useState("");

  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, currentUser } = useUser();

  useEffect(() => {
    currentUser();
  }, []);

  /// /
  // Handle form submission
  /// /
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on submit
    setLoading(true);   // Show loading state
    setError(null);     // Clear previous errors

    // Check so comment is at least one character
    if(text.length < 1) {
      // If not set error message
      setError("Comment must contain at least one character");
      // Stop loading
      setLoading(false);
      return;
    }

    try {
      const res = await addComment(threadId, text);
      console.log(res)
      setText("");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("You must be logged in to comment")
      } else {
        setError("Error adding comment")
      }
    } finally {
      setLoading(false);
    }    
  }; 


  return (
    <form className="text-br-text flex flex-col gap-3" onSubmit={handleSubmit}>
      {isLoggedIn ? (
        <>
          <label htmlFor="text" className="block text-lg font-medium text-start">
            Join the conversation
          </label>
          <textarea
            className="w-full p-2 border border-br-background-600 rounded-lg bg-br-background-800"
            id="text"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button className="w-full p-2 md:p-3 bg-brand text-br-background rounded-lg hover:bg-brand-300 cursor-pointer" type="submit">
            {loading ? "Adding comment..." : "Add comment"}
          </button>
          <Link to="/" className="w-full p-2 md:p-3 text-brand rounded-lg hover:bg-br-background-800 border cursor-pointer border-brand">View all threads</Link>
        </>
      ) : (
        <div className="flex flex-col gap-5 my-5">
          <p>
           <Link to="/register" className="text-brand underline hover:text-brand-300">Create account</Link> or <Link to="/login" className="text-brand underline hover:text-brand-300">Log in</Link> to join the conversation
          </p>
          <Link to="/" className="w-full md:w-50 mx-auto p-2 md:p-3 text-brand rounded-lg hover:bg-br-background-800 border cursor-pointer border-brand">View all threads</Link>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
