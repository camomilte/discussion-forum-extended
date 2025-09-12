import axios from "axios";
import type { UserProfile } from "../models/users";
import type { Thread, ThreadCategory } from "../models/threads";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/signin", { Email: email, Password: password });
  return response; // token finns i header Authorization
};

export const logout = async () => {
  await api.post("/auth/signout");
};

export const register = async (email: string, username: string, password: string) => {
  const response = await api.post("/auth/register", { Email: email, Username: username, Password: password });
  return response;
};

export const fetchMe = async(): Promise<UserProfile | null> => { 
  const res = await api.get<UserProfile>("/users/me");
  if([200, 202, 204].includes(res.status)) {
    return res.data;
  }
  return null;
}

export const fetchThreads = async(): Promise<Thread[]> => { 
  const res = await api.get<Thread[]>("/threads");
  return res.data;
}

export const createThread = async(header: string, text: string, category: ThreadCategory): Promise<Thread> => {
  const res = await api.post<Thread>("/threads", { Header: header, Text: text, Category: category})
  return res.data;
}