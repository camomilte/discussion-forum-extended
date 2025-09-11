import axios from "axios";

const API_URL = "";

axios.defaults.withCredentials = true;

export const login = async (email: string, password: string): Promise<any> => {
  const response = await axios.post(`${API_URL}/auth/signin`, {
    'Email': email, 
    'Password': password 
  }, { withCredentials: true });

  console.log(response)
  return response;
  
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/signout`);
};

export const register = async ( email: string, username:string, password:string): Promise<void> => {
  const response = await axios.post(`${API_URL}/auth/register`, { 
    email, 
    username, 
    password 
  }, { withCredentials: true });
  return response.data;
};
export const register = async ( email: string, username:string, password:string): Promise<void> => {
  const response = await axios.post(`${API_URL}/auth/register`, { 
    email, 
    username, 
    password 
  }, { withCredentials: true });
  return response.data;
};