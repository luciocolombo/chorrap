import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.API_URL ||
    'https://mascotasperdidasapi.herokuapp.com' /* 'http://localhost:4000' */,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = window.localStorage.getItem('jwt');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
