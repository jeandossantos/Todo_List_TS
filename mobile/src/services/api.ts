import axios from 'axios';

const baseURL = 'http://192.168.1.3:3001';

export const api = axios.create({
  baseURL,
});
