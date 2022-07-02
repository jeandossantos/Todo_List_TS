import { api } from '../services/axios';
import { useEffect, useState } from 'react';
import { Loading } from './Loading/Loading';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PrivateRouteProps = {
  element: JSX.Element;
};

export function PrivateRoute({ element }: PrivateRouteProps) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  useEffect(() => {
    console.log('auth');
    (async () => {
      try {
        const json = localStorage.getItem(import.meta.env.VITE_MY_SECRET);

        if (!json) {
          logout();
        }

        const userData = JSON.parse(json || `{}`);

        const { data } = await api.post('/validateToken', userData);

        if (!data) logout();

        api.defaults.headers.common[
          'Authorization'
        ] = `bearer ${userData.token}`;

        setIsTokenValid(data);
      } catch (error) {
        return logout();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  return isTokenValid ? element : <Navigate to={'/login'} />;
}
