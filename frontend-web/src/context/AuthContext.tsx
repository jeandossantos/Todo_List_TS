import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/axios';

type User = {
  id: string;
  photo?: string;
  name: string;
  email: string;
  deletedAt?: Date;
  token: string;
};

type AuthContextType = {
  user: User | undefined;
  login: (data: User) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type AuthContextProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProvider) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const json = localStorage.getItem(import.meta.env.VITE_MY_SECRET);

    if (json) {
      const userData: User = JSON.parse(json);

      setUser(userData);
    }
  }, []);

  async function login(data: User) {
    api.defaults.headers.common['Authorization'] = `bearer ${data.token}`;

    localStorage.setItem(import.meta.env.VITE_MY_SECRET, JSON.stringify(data));

    setUser(data);
  }

  function logout() {
    localStorage.removeItem(import.meta.env.VITE_MY_SECRET);

    delete api.defaults.headers.common['Authorization'];

    setUser(undefined);
    window.location.href = '/login';
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
