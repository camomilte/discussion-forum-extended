import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';import type { ThreadCategory } from '../models/threads';
import { useThread } from '../context/threadContext';

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

const CreateThreadForm: React.FC = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<ThreadCategory | "">("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { addThread } = useThread();

  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    try {
      await addThread({ header, text, category: category as ThreadCategory });
      navigate("/"); // redirect after creation
    } catch (err) {
      setError("Error creating thread");
    } finally {
      setLoading(false);
    }
  }
  
    
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

export default CreateThreadForm;
