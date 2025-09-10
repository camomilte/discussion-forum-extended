import type { Comment } from "../types/types";
import type { UserProfile } from "./users";

// Define shape of CommentContext
export type CommentContextType = {
  // All comments stored
  comments: Comment[];
  actions: {
    addComment: (comment: Omit<Comment, 'id' | 'creationDate'>) => void; // Exclude id and creationDate as they will be generated automatically in context
    deleteComment: (id: number) => void; // Delete comment by id
  };
}

export type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};