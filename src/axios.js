import axios from 'axios';

export const backend = axios.create({
  baseURL: 'https://api.exchangerate.host/',
});
