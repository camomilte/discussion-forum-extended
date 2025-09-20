import { useEffect, useState } from "react";
import CreateThreadForm from "../component/CreateThreadForm";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";


function CreateThreadPage() {
  // 
  const { isLoggedIn, currentUser } = useUser();
  // State to hold error
  const [error, setError] = useState<string | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      console.log("loading before fetch:", loading);
      setLoading(true);
      setError(null);
      try {
        await currentUser();
      } catch (err: any) {
        setError(err.message || "Failed to fetch user"); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    console.log("loading after fetch:", loading);
  }, []);

  return (
    <div>
      {loading ? (
        <PropagateLoader /> 
      ) : error ? (
        <p className="text-red-500 mb-2">{error}</p>
      ) : isLoggedIn ? (
        <>
          <h1>CREATE THREAD PAGE</h1>
          <CreateThreadForm />
        </>
      ) : (
        <>
          <p>You must be logged in to create a thread</p>
          <Link to="/login">Log in</Link> or <Link to="/register">Create account</Link>
        </>
      )}
    </div>
  );
}

export default CreateThreadPage;