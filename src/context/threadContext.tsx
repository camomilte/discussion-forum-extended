import { createContext, useContext, useState } from "react";
import type { Thread, ThreadCategory, ThreadContextType } from "../models/threads";
import { createThread, fetchThreads } from "../utils/apiService";

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);


export const ThreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [threads, setThreads] = useState<Thread[]>([]);

    const addThread = async (thread: { header: string; text: string; category: ThreadCategory }) => {
        const newThread = await createThread(thread);
        setThreads((prev) => [...prev, newThread]);
    };

    const loadThreads = async () => {
        const allThreads = await fetchThreads();
        setThreads(allThreads);
    };

  return (
    <ThreadContext.Provider value={{ threads, addThread, loadThreads }}>
      {children}
    </ThreadContext.Provider>
  );
};

export function useThread() {
  const context = useContext(ThreadContext);
  if (!context) throw new Error("useThread must be used within a ThreadProvider");
  return context;
}