import { createContext, useContext, useEffect, useState } from "react";
import type { UserProfile } from "../models/users";
import * as authService from "../utils/authService";

interface UserContextType {
  user: UserProfile | null;
  isReady: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user already logged in (cookie still valid)
    const init = async () => {
      try {
        const profile = await authService.getCurrentUser();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  const login = async (username: string, password: string) => {
    await authService.login(username, password);
    const profile = await authService.getCurrentUser();
    setUser(profile);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isReady, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
