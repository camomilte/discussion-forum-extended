// Comment type 
export type Comment = {
	id: number;
	threadId: Thread["id"];
	content: string;
	creator?: User,
  creationDate: Date;
}