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

    // Fetch current user profile data
    const me = await api.fetchMe();
    // Save user to state
    setUser(me);
    // Log user
    console.log(me);
  };

  /// /
  // Function to log out user
  /// /
  const logout = async (): Promise<void> => {
    // Clear current user from state
    setUser(null);
    // Remove authentication token
    api.setAuthToken(null);
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

  // Provide user context functions and states to all child components
  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
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
