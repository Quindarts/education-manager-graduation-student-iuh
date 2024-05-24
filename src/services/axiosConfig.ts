import { getValueFromLocalStorage } from '@/utils/localStorage';
import axios, { AxiosResponse, ResponseType } from 'axios';

// `${process.env.REACT_APP_API_URL}` ||
const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});


axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = getValueFromLocalStorage("accessToken");
    console.log(accessToken)
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
    console.log("🚀 ~ response:", response)
    return response.data;
  },
  // async (error) => {
  //   const userToken = JSON.parse(localStorage.getItem('user') || '{}');
  //   const originalRequest = error.config;

  //   if (error.response.status === 403 && !originalRequest._retry) {
  //     originalRequest._retry = true;

  //     try {
  //       const refreshToken = userToken.tokenList?.refreshToken;
  //       const response = await axiosConfig.post('auth/accessToken-generate', {
  //         refreshToken,
  //       });

  //       const { accessToken } = response.data;
  //       userToken.tokenList = {
  //         accessToken,
  //         refreshToken,
  //       };

  //       localStorage.setItem('user', JSON.stringify(userToken));
  //       originalRequest.headers.Authorization = `Bearer ${accessToken}`;

  //       return axiosConfig(originalRequest);
  //     } catch (error) {
  //       return Promise.reject(error);
  //     }
  //   }

  //   return Promise.reject(error.response.data);
  // },
);
export default axiosConfig;
