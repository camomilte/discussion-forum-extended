// Imports
import React, { useState } from "react";
import { useComments } from "../context/commentContext";
import type { Thread } from "../models/threads";

// Define props for CommentForm
interface CommentFormProps {
  thread: Thread; 
}


// Define the CommentForm component
function CommentForm({ thread }:CommentFormProps) {
  // Destructure actions from context
  const { actions } = useComments();
  // Local state for input field 
  const [content, setContent] = useState("");

  /// /
  // Handle form submission
  /// /
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If content is empty or just spaces do nothing
    if (!content.trim()) return;

    // Call addComment with required fields (in this case hardcoded example)
    actions.addComment({
      content,
      threadId: thread.id,
    });

    // Reset input field to empty after submit
    setContent("");
    
  };

  return (
    <form className="formlayout comment-form" onSubmit={handleSubmit}>
      <textarea
        className="textarea-input flex"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Join the conversation"
      />
      <button className="btn form-btn" type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
