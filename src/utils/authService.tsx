import axios from "axios";

const API_URL = "https://192.168.1.114:7145/api/v1";

axios.defaults.withCredentials = true;

export const login = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/auth/signin`, {
    'Email': email, 
    'Password': password 
  }, { withCredentials: true });

  if (response.status = 202) return response;
  else return response;
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/signout`);
  // Backend clears the cookie
};

export const register = async ( email: string, username:string, password:string): Promise<void> => {
  const response = await axios.post(`${API_URL}/auth/register`, { 
    email, 
    username, 
    password 
  }, { withCredentials: true });
  return response.data;
};