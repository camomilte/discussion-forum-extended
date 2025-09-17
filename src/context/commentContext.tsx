// Import types
import type { Comment, CommentContextType } from "../models/comments";
// Import React hooks and types
import { createContext, useCallback, useContext, useState } from "react";
import { fetchThreadsComments } from "../utils/apiService";

// Create new context for comments
const CommentContext = createContext<CommentContextType | undefined>(undefined);

// Define and export the CommentProvider component
export const CommentProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold comment array
  const [comments, setComments] = useState<Comment[]>([]);

  // State for errors
  const [error, setError] = useState<string | undefined>(undefined);
  // State for loading status
  const [loading, setLoading] = useState(false);

  /// /
  // Function to load all comments for specific thread
  /// /
  const loadComments = useCallback(async (threadId: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const allComments = await fetchThreadsComments(threadId);
      setComments(allComments);   
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  },[])

/*   /// /
  // Add comment
  /// /
  const addComment = (commentData: Omit<Comment, 'id' | 'creationDate'>) => {
    // Create new comment object
    const newComment: Comment = {
      id: generateId(),
      creationDate: new Date(),
      ...commentData,
    };
    // Update state
    setComments(prev => [newComment, ...prev]);
  }; */

 /*  /// /
  // Delete comment
  /// /
  const deleteComment = (id: number) => {
    // Filter out commment with matching id
    setComments(prev => prev.filter(comment => comment.id !== id));
  }; */

  // Provide comments array and grouped actions to all child components
  return (
    <CommentContext.Provider 
      value={{ 
        comments, 
        error, 
        loading, 
        loadComments,
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

