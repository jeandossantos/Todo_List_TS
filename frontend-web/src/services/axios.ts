import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type ResponseData = {
  message?: string | undefined;
  code?: number | undefined;
};

const data = localStorage.getItem(import.meta.env.VITE_MY_SECRET);
const payload = JSON.parse(data || '{}');

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response) {
      const data = error.response.data as ResponseData;

      if (error.response.status !== 500) {
        toast.error(data.message || 'Erro inesperado.');
      }
    }

    return Promise.reject(error);
  }
);
