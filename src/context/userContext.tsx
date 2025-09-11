import { createContext, useContext, useEffect, useState } from "react";
import type { UserProfile } from "../models/users";
import * as authService from "../utils/authService";
import type { UserContextType } from "../models/contextTypes";

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  const login = async (username: string, password: string) => {
    const result = await authService.login(username, password)
    
    if(result.status = 202) {
      // Successful login
      console.log("Log in successful")

    }else {
      // Login failed
      console.error(result)
    }
  };

  

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const register = async (email: string, username:string, password: string) => {
    const profile = await authService.register(email, username, password);
    
    /* const profile = await authService.getCurrentUser(); */
  }


  return (
    <UserContext.Provider value={{ user, isReady, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
