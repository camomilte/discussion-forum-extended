import type React from "react";
import { createContext, useEffect, useState } from "react";
import type { UserContextType } from "../models/contextTypes";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../models/users";
import axios from "axios";

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
 const navigate = useNavigate();
 const [token, setToken] = useState<string | null>(null);
 const [user, setUser] = useState<UserProfile | null>(null);
 const [isReady, setIsReady] = useState(false);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get<UserProfile>("https://localhost:5167/api/account/me", {
          withCredentials: true,
        });
      setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };
   fetchUser();
  }, []);



}