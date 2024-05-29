import Axios from 'axios';
import { getToken } from 'yarn/lib/cli';
// import { Base_URL } from ""

export const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  (congfig) => {
    const accessToken = getToken();

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
