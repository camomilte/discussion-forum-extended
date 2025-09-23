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
        <div className="flex justify-center items-center h-120">
            <PropagateLoader color="#40b83d"/>
        </div>
      ) : error ? (
        <p className="text-red-500 mb-2">{error}</p>
      ) : isLoggedIn ? (
        <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
          <CreateThreadForm />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-6rem)]">
          <p className="text-br-text text-xl">You must be logged in to create a thread</p>
          <span className="text-br-text text-xl">
            <Link to="/login" className="text-xl font-bold text-brand hover:text-brand-300 underline">Log in</Link> or <Link to="/register" className="text-xl font-bold text-brand hover:text-brand-300 underline">Create account</Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default CreateThreadPage;