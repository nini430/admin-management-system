import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import removeTokens from './utils/removeTokens';
import { setAuthedUser } from './store/userSlice';

declare module 'axios' {
  interface AxiosRequestConfig {
    _isRetry: boolean;
  }
}

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:7000/api/v1',
  _isRetry: false,
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    if (config.url !== '/user/register' && config.url !== '/auth/login') {
      const token = localStorage.getItem(
        config.url === '/auth/refresh-token' ? 'refreshToken' : 'accessToken'
      );
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    if (
      config.url === '/auth/refresh-token' &&
      !localStorage.getItem('refreshToken')
    ) {
      return Promise.reject();
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/auth/login') {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (response.config.url === '/auth/refresh-token') {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
    }
    return response;
  },
  async (
    error: AxiosError<{
      config: InternalAxiosRequestConfig<{ _isRetry: boolean }>;
    }>
  ) => {
    const originalRequest = error.config;
    console.log(originalRequest)
    console.log(error);
    if (
      originalRequest &&
      !originalRequest._isRetry &&
      error.response?.status === 401 &&
      originalRequest.url !== '/auth/login' &&
      originalRequest.url !== '/auth/refresh-token' &&
      originalRequest.url !== '/user/register'
    ) {
      try {
        await axiosApiInstance.post('/auth/refresh-token');
        originalRequest._isRetry = true;
        return await axiosApiInstance(originalRequest);
      } catch (err) {
        console.log(err);
        setAuthedUser(null);
        removeTokens();
      }

      if (originalRequest.url === '/auth.refresh-token') {
        removeTokens();
      }
    }
    return Promise.reject(error);
  }
);
export default axiosApiInstance;
