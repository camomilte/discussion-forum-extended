// Axios
import axios from "axios";
// Types
import type { UserProfile } from "../models/users";
import type { Thread, ThreadCategory } from "../models/threads";
import type { Comment } from "../models/comments";

// Define base URL taken from enviroment viarables
const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance with the base URL set
export const api = axios.create({
  baseURL: API_URL
});

/// /
// Function to set or remove authorization header for axios requests
/// /
export const setAuthToken = (token: string | null) => {
  if (token) {
    // If token exists, add it as Bearer token in authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If no token, remove authorization header
    delete api.defaults.headers.common["Authorization"];
  }
};

/// /
// Function to log in user
/// /
export const login = async (email: string, password: string) => {
  // Send post request with email and password
  const response = await api.post("/auth/sign-in", { Email: email, Password: password });
  // Return response (with auth token)
  return response;
};

/// /
// Function to log out user
/// /
export const logout = async () => {
  // Send post request to end session
  await api.post("/auth/sign-out");
};

/// /
// Function to register new user
/// /
export const register = async (email: string, username: string, password: string) => {
  // Send post request with email, username and password
  const response = await api.post("/auth/register", { Email: email, Username: username, Password: password });
  // Return server response
  return response;
};

/// /
// Function to fetch current user
/// /
export const fetchMe = async(): Promise<UserProfile | null> => {
  // Send a get request to 'users/me'
  const res = await api.get<UserProfile>("/users/me");
  // If status is 200, 202 or 204, return profile data
  if([200, 202, 204].includes(res.status)) {
    return res.data;
  }
  // If not, return null
  return null;
}

/// /
// Function to get all threads
/// /
export const fetchThreads = async(): Promise<Thread[]> => { 
  // Send get request
  const res = await api.get<Thread[]>("/threads");
  // Return response data
  return res.data;
}

/// /
// Function to create thread
/// /
export const createThread = async(header: string, text: string, category: ThreadCategory): Promise<Thread> => {
  // Send post request with header, text and category
  const res = await api.post<Thread>("/threads", { Header: header, Text: text, Category: category})
  // Return response data
  return res.data;
}

/// /
// Function to fetch single thread
/// /
export const singleThread = async (id: number): Promise<Thread> => {
  const res = await api.get<Thread>(`/threads/${id}`);
  return res.data;
}

/// /
// Function to fetch all comments based of thread id
/// /
export const fetchThreadsComments = async (threadId:number): Promise<Comment[]> => {
  const res = await api.get<Comment[]>(`/threads/${threadId}/comments`);
  return res.data
}

/// /
// Function to create comment
/// /
export const createComment = async(text: string, threadId: number): Promise<Comment> => {
  const res = await api.post<Comment>(`/threads/${threadId}/comments`, {Text: text});
  return res.data
}