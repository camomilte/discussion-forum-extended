import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

export const login = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/auth/signin`, {
    'Email': email, 
    'Password': password 
  }, { withCredentials: true });
  return response;  
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/signout`);
};

export const register = async ( email: string, username:string, password:string): Promise<any> => {
  const response = await axios.post(`${API_URL}/auth/register`, { 
    'Email': email, 
    'Username':username, 
    'Password': password 
  }, { withCredentials: true });
  return response;
};