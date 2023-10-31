import axios from 'axios';

const TOKEN_KEY = 'accessToken';

const api = axios.create({
  // baseURL: import.meta.env.MODE === 'production' ? '/' : import.meta.env.VITE_API_BASE_URL
  baseURL: "/"
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem(TOKEN_KEY);
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err: any) => {
    // 请求错误，这里可以用全局提示框进行提示
    return {
      error: {
        ...err,
      },
    };
  },
);

// 响应拦截器
api.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return { response: response.data };
  },
  (error) => {
    if (error.response) {
      return {
        error: {
          ...error.response.data,
          httpStatus: error.response.status,
        },
      };
    }

    return { error };
  },
);

export default api;
