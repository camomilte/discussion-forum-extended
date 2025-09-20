// Import React and React router hooks and components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// Import Page components
import CreateThreadPage from './pages/CreateThreadPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ThreadPage from "./pages/ThreadDetailPage";
// Import styling
import "./App.css";
// Import conext
import { CommentProvider } from "./context/commentContext";

import RegisterPage from "./pages/RegisterPage";
import { UserProvider } from "./context/userContext";


/* import { ToastContainer } from "react-toastify"; */


function App() {
  
  return (
    <CommentProvider>
      <UserProvider>
        <Router>
          <Routes>

            {/* -- HomePage -- */}
            <Route path="/" element={<HomePage />} />

            {/* -- LoginPage -- */}
            <Route path="/login" element={<LoginPage />} />

            {/* -- RegisterPage -- */}
            <Route path="/register" element={<RegisterPage />} />

            {/*   -- ThreadPage --  */}
            <Route path="/thread/:threadId" element={<ThreadPage />} /> 

            {/* --CreateThreadPage-- */  }
            <Route path="/createthread" element={<CreateThreadPage/>} />

  {/*           <ToastContainer /> */}

          </Routes>
        </Router>
      </UserProvider>
    </CommentProvider>
  );
}

export default App;
