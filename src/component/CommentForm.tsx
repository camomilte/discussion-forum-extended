// Imports
import React, { useState } from "react";
import { useComments } from "../context/commentContext";

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
    <form className="formlayout comment-form" onSubmit={handleSubmit}>
      <textarea
        className="textarea-input flex"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Join the conversation"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="btn form-btn" type="submit">
        {loading ? "Adding comment..." : "Add comment"}
      </button>
    </form>
  );
};

export default CommentForm;
