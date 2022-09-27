import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const userAuth = useContext(AuthContext);

  return userAuth;
}
