// Import navigation hook
import { useNavigate } from "react-router-dom";
// Import components
import ThreadList from "../component/ThreadList";
import Navbar from "../component/Navbar";

// Define HomePage component
function HomePage() {
  // Get navigate function
  const navigate = useNavigate();

   // Function called when a thread is clicked in ThreadList
  const handleSelect = (id: number) => {
    // Navigate to thread detail page with the clicked thread's id
    navigate(`/thread/${id}`);
  };

  return (
    <div>
      <Navbar/>
      <h1>Welcome to Dog Community</h1>
      <ThreadList onSelect={handleSelect}/>
    </div>
  );
}
//
export default HomePage;