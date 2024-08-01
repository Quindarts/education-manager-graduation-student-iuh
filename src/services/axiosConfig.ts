import { env } from '@/utils/env';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: `${env.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});


axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = getValueFromLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.status === 401 && error.response.data.success === false) {
      originalRequest._retry = true;

      try {
        const refreshToken = getValueFromLocalStorage("refreshToken");
        const result: any = await axiosConfig.post('/api/v1/lecturers/refresh-token', {
          refreshToken,
        });
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return axiosConfig(originalRequest);

      } catch (error: any) {

        if (error.message === 'jwt expired' && error.status === 500 && error.success === false) {
          localStorage.clear();
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error.response.data);

  },
);
export default axiosConfig;
