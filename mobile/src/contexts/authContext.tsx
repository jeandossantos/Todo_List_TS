import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  deletedAt: Date | null;
  token: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signed: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function getStorageData() {
    const storageData = await AsyncStorage.getItem('@user_payload');

    if (storageData) {
      setUser(JSON.parse(storageData));
      console.log('User useEffect', user);
      api.defaults.headers.common['Authorization'] = `Bearer {${user?.token}}`;
    }
    setLoading(false);
  }

  useEffect(() => {
    getStorageData();
  }, []);

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });

      setUser(data);

      console.log('Login', data);

      api.defaults.headers.common['Authorization'] = `bearer ${data.token}`;

      AsyncStorage.setItem('@user_payload', JSON.stringify(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      }
    }
  }

  async function logout() {
    await AsyncStorage.clear();
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, user, signed: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
