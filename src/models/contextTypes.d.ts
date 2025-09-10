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
  isReady: boolean;
  register: (email: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}