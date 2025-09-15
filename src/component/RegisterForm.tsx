// React functions
import { useState } from "react";
// Reazct Router functions
import { Link, useNavigate } from "react-router-dom";
// Api functions
import { register } from "../utils/apiService";

// Define RegiserForm components
function RegisterForm() {
  // States to store input fields
  const [username, setUsername] = useState(""); // Username
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Password
  const [repeatPassword, setRepeatPassword] = useState(""); // Repeat passord

  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /// /
  // Function to handle register form submission
  /// /
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check so that username has a minimum of 3 characters
    if (username.length < 3) {
      // If not show error message
      setError("Username must be at least 3 characters");
      // Stop loading
      setLoading(false);
      return;
    }

    // Check so that password and repeatPassword are identical
    if (password !== repeatPassword) {
      // If not show error message
      setError("Passwords do not match");
      // Stop loading
      setLoading(false);
      return;
    }

    try {
      // Attempt to run register function
      await register(email, username, password);
      // Consol log on successful register
      console.log("Register successful");
      // Redirect to log in page
      navigate("/login");
    } catch (err) {
      // Display user friendly error message
      setError("Error registering user");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // Rendered tsx
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>

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

      <div className="mb-2">    
        <label htmlFor="username" className="block mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      <div className="mb-4">
        <label htmlFor="repeatPassword" className="block mb-1">
          Repeat password
        </label>
        <input
          id="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p>Already have an account? <Link to="/login">Click here</Link> to log in</p>
    </form>
  )
}

// Export component
export default RegisterForm; 