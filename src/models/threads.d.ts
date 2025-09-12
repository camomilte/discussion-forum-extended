// Allowed thread categories
export type ThreadCategory = "General" | "Plant Health & Pests" | "Propagation & Growth" | "Identification" | "Edible Plants" | "Gardening" | "Houseplants" | "Rare & Exotic";

// Base thread type for forum discussions
export type Thread = {
  id: number;
  header: string;
  text: string;
  category: ThreadCategory;
  resolved: boolean;
  createdAt: string;
  owner: string;
  ownerId: number;
}

/* // Q&A-thread type extension 
export type QNAThread =  Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number;
} */

export type ThreadContextType = {
  threads: Thread[];
  addThread: (header: string, text: string, category: ThreadCategory) => Promise<Thread>;
  loadThreads: () => Promise<void>;
}