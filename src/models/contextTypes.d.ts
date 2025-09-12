import type { Comment } from "../types/types";

// Define shape of CommentContext
export type CommentContextType = {
  // All comments stored
  comments: Comment[];
  actions: {
    addComment: (comment: Omit<Comment, 'id' | 'creationDate'>) => void; // Exclude id and creationDate as they will be generated automatically in context
    deleteComment: (id: number) => void; // Delete comment by id
  };
}



