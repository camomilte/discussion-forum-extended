// Import navigation hook
import { useNavigate } from "react-router-dom";
// Import components
import Navbar from "../component/Navbar";
import ThreadList from "../component/ThreadList";
import { useEffect, useState } from "react";
import { useThread } from "../context/threadContext";

// Define HomePage component
function HomePage() {
  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);

  // Get loadThreads function from threadContext
  const { threads, loadThreads } = useThread();
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function called when a thread is clicked in ThreadList
  const handleSelect = (id: number) => {
    // Navigate to thread detail page with the clicked thread's id
    navigate(`/thread/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);      // Start loading
      setError(null);        // Clear any previous errors

      try {
        // Call load threads function from thread context
        await loadThreads(); 
      } catch (err: any) {
        // If errors, set error message
        setError(err.message || "Failed to load threads");
      } finally {
        // Stop loading
        setLoading(false); 
        console.log("Loading finished");
      }
    };
    
    fetchData();

  }, [loadThreads]);

  return (
    <div>
      <Navbar/>
      <h1>Welcome to Bloom & Gloom</h1>
      <ThreadList 
        onSelect={handleSelect} 
        threads={threads} 
        loading={loading}
        error={error}
      />
    </div>
  );
}
//
export default HomePage;