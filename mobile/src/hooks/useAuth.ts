import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export function useAuth() {
  const userAuth = useContext(AuthContext);

  return userAuth;
}
