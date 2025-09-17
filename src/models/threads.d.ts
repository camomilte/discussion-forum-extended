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

export type ThreadContextType = {
  currentThread: Thread | null;
  loading?: boolean;
  error?: string | undefined;
  threads: Thread[];
  addThread: (header: string, text: string, category: ThreadCategory) => Promise<Thread>;
  loadThreads: () => Promise<void>;
  getThread: (id: number) => Promise<void>;
}