// React hooks and functions
import { createContext, useContext, useState } from "react";
// Types
import type { Thread, ThreadCategory, ThreadContextType } from "../models/threads";
// Api functions
import { createThread, fetchThreads } from "../utils/apiService";

// Create new context for threads
const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

// Define and export ThreadProvider component
export const ThreadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to hold list of threads, initially empty
    const [threads, setThreads] = useState<Thread[]>([]);
 
    /// /
    // Function to add thread
    /// /
    const addThread = async (header: string, text: string, category: ThreadCategory) => {
        // Create thread via api
        const newThread = await createThread(header, text, category);
        // Update threads state by adding new thread to existing ones
        setThreads((prev) => [...prev, newThread]);
        // Return created thread
        return newThread;
    };

    /// /
    // Function to load all threads
    /// /
    const loadThreads = async () => {
        // Get all threads from api
        const allThreads = await fetchThreads();
        // Replace current thread state with fetched threads
        setThreads(allThreads);
    };

    // Provide thread context functions and states to all child components
    return (
        <ThreadContext.Provider value={{ threads, addThread, loadThreads }}>
            {children}
        </ThreadContext.Provider>
    );
};

// Custom hook to use the ThreadContext in components
export function useThread() {
    // Access thread context
    const context = useContext(ThreadContext);
    // Throw error if context is used outside provider
    if (!context) throw new Error("useThread must be used within a ThreadProvider");
    // Return context value
    return context;
}