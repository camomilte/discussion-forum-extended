// Comment type 
export type Comment = {
	id: number;
	parentThreadId: number;
	text: string;
	owner: string;
	ownerId: number;
  createdAt: string;
}

export type CommentContextType = {
	loading?: boolean;
	error?: string | undefined;
	comments: Comment[];
	loadComments: (threadId: number) => Promise<void>;
}