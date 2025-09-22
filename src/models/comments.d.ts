// Comment type 
export type Comment = {
	id: number;
	parentThreadId: number;
	text: string;
	owner: string;
	ownerId: number;
  createdAt: string;
	answer: boolean;
}

export type CommentContextType = {
	comments: Comment[];
	loadComments: (threadId: number) => Promise<void>;
	addComment: (threadId: number, text: string) => Promise<void>;
	markCommentAsAnswer: (commentId: number) => Promise<void>;
}