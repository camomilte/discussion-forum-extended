// React functions
import { useState } from 'react';
// React Router functions
import { useNavigate } from 'react-router-dom';
// Types
import type { ThreadCategory } from '../models/threads';
// Thread Context hook
import { useThread } from '../context/threadContext';

// Define array of thread categories
const categories: ThreadCategory[] = [
  "General",
  "Plant Health & Pests",
  "Propagation & Growth",
  "Identification",
  "Edible Plants",
  "Gardening",
  "Houseplants",
  "Rare & Exotic",
];

// Define CreateThreadForm component
const CreateThreadForm: React.FC = () => {
  // States to store input fields
  const [header, setHeader] = useState(""); // Header
  const [text, setText] = useState(""); // Text
  const [category, setCategory] = useState<ThreadCategory | "">(""); // Category

  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);

  // Get addThread function from threadContext
  const { addThread } = useThread();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /// /
  // Function to handle create thread form submission
  /// /
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on submit
    setLoading(true);   // Show loading state
    setError(null);     // Clear previous errors

    // Check if category has been selected
    if (!category) {
      // Display error
      setError("Please select a category");
      // Stop loading
      setLoading(false);
      return;
    }

    try {
      // Attempt to run addThread function
      await addThread(header, text, category);
      // Redirect to home on successfull submission
      navigate("/");
    } catch (err) {
      // Display user friendly error message
      setError("Error creating thread");
    } finally {
      // Stop loading
      setLoading(false);
    }
  }
  
  // Rendered TSX
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create thread</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-2">
        <label htmlFor="header" className="block mb-1">
          Header
        </label>
        <input
          id="header"
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="text" className="block mb-1">
          Text
        </label>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ThreadCategory)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}

// Export component
export default CreateThreadForm;
