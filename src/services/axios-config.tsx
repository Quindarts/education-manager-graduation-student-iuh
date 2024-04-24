import { getValueFromLocalStorage } from '@/utils/localStorage';
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosConfig = axios.create({
  timeout: 30000,
  headers: {
    'Context-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const accessToken: string = getValueFromLocalStorage('access_token') || '';
    if (request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error: AxiosError) => error,
);
axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (error: AxiosError) => Promise.reject(error?.response?.data),
);

export default axiosConfig;
