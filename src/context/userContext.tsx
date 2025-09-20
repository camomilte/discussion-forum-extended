// React hooks and functions
import { createContext, useContext, useState } from "react";
// Types
import type { UserProfile, UserContextType } from "../models/users";
// Api functions
import * as api from "../utils/apiService.tsx";

// Create new context for users
const UserContext = createContext<UserContextType>({} as UserContextType);

// Define and export UserProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold user, inistially empty
  const [user, setUser] = useState<UserProfile | null>(null);
  // State to hold user authorisation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /// /
  // Function to login
  /// /
  const login = async (email: string, password: string) => {

    // Call api login function with email and passowrd
    const response = await api.login(email, password);
    // Extract authentication token from response
    const authToken = response.data["accessToken"];
    // Throw error if no token is returned
    if (!authToken) throw new Error("No token returned from backend");

    // Store token for future requests
    api.setAuthToken(authToken);
  
  };

  /// /
  // Function to register user
  /// /
  const register = async (email: string, username: string, password: string) => {
    // Call api to register with email, username, and password
    const response = await api.register(email, username, password);
    // Return full response
    return response;
  };

  /// / 
  // Function to check if user is logged in
  /// /
  const currentUser = async () => {
    const fetchedUser = await api.fetchMe();
    console.log("Fetched user:", fetchedUser);
    setUser(fetchedUser);
    setIsLoggedIn(!!fetchedUser);
  };

  /// /
  // Function to log out user
  /// /
  const logoutUser = async () => {
    await api.logout();

    setUser(null);
    setIsLoggedIn(false);
  };


  // Provide user context functions and states to all child components
  return (
    <UserContext.Provider value={{ user, login, register, currentUser, logoutUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  // Get the UserContext
  const context = useContext(UserContext);
  // Throw error if context is used outside provider
  if (!context) throw new Error("useUser must be used within a UserProvider");
  // Return the context value
  return context;
}
