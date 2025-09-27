// Import types
import type { Comment, CommentContextType } from "../models/comments";
// Import React hooks and types
import { createContext, useCallback, useContext, useState } from "react";
import { commentAnswerStateAPI, createComment, fetchThreadsComments } from "../utils/apiService";

// Create new context for comments
const CommentContext = createContext<CommentContextType | undefined>(undefined);

// Define and export the CommentProvider component
export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold comment array
  const [comments, setComments] = useState<Comment[]>([]);

  /// /
  // Function to load all comments for specific thread
  /// /
  const loadComments = useCallback(async (threadId: number) => {
      const allComments = await fetchThreadsComments(threadId);
      setComments(allComments);
  },[])

  /// /
  // Function to create a comment under specific thread
  /// /
  const addComment = async (threadId: number, text: string) => {
    const newComment = await createComment(text, threadId);
    setComments((prev) => [...prev, newComment]);
  }

  /// / 
  // Function to set comment answer state
  /// /
  const setCommentAnswerState = async (commentId: number, isAnswer: boolean) => {
    // anropa API:t (som returnerar uppdaterad kommentar)
    await commentAnswerStateAPI(commentId, isAnswer);

    const updatedComments = comments.map(c =>
      c.id === commentId ? { ...c, answer: isAnswer } : c
    );
    setComments(updatedComments);
    console.log(updatedComments.find(c => c.id === commentId)); // nu ser du nya värdet
  }

  // Provide comments array and grouped actions to all child components
  return (
    <CommentContext.Provider 
      value={{ 
        comments,
        loadComments,
        addComment,
        setCommentAnswerState,
        }}>
      {children}
    </CommentContext.Provider>
  );
};

// Custom hook to access the comment context safely
export const useComments = (): CommentContextType => {
  const context = useContext(CommentContext);
  if (!context) {
    // If hook is used outside provider, throw error
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

