// React functions
import { useState } from "react";
// React router functions
import { useNavigate } from "react-router-dom";
// User Context hook
import { useUser } from "../context/userContext";

// Define LoginForm component
function LoginForm() {
  // States to store input fields
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Password
  
  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);

  // Get login function from userContext
  const { login } = useUser();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /// /
  // Function to handle login form submission
  /// /
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on submit
    setLoading(true);   // Show loading state
    setError(null);     // Clear previous errors

    try {
      // Attempt to run login function
      await login(email, password);
      // Redirect to home on successful login
      navigate("/");
    } catch (err) {
      // Log error
      console.log(err)
      // Display user friendly error message
      setError("Invalid username or password");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // Rendered TSX
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-2">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

// Export component
export default LoginForm;