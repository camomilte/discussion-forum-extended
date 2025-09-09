import axios from "axios";
import { handleError } from "./errorHandler";
import type { UserProfileToken } from "../models/users";

const api = "https://localhost:5167/api";

export const login = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/login", {
      username: username,
      password: password
    });
    return data
  } catch (error) {
    handleError(error);
  }
}

export const register = async (email: string, username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/register", {
      email: email,
      username: username,
      password: password
    });
    return data
  } catch (error) {
    handleError(error);
  }
}