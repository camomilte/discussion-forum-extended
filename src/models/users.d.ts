export type UserProfile = {
  userName: string;
  email: string;
  role: string;
};

export type UserContextType = {
  user: UserProfile | null;
  register: (email: string, username: string, password: string) => Promise<AxiosResponse<any>>;
  login: (username: string, password: string) => Promise<>;
  logout: () => Promise<void>;
}