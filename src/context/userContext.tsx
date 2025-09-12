import { createContext, useContext, useState } from "react";
import type { UserProfile } from "../models/users";
import * as api from "../utils/apiService.tsx";
import type { UserContextType } from "../models/users.d.ts";

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);

    const authToken = response.data["accessToken"];
    if (!authToken) throw new Error("No token returned from backend");

    api.setAuthToken(authToken);

    const me = await api.fetchMe();
    setUser(me);
    console.log(me);
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    api.setAuthToken(null);
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await api.register(email, username, password);
    return response;
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
