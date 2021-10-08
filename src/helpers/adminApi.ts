import axios, { AxiosRequestConfig } from 'axios';

// const baseURL = 'http://172.16.12.10:8080/api';
const baseURL = 'http://192.168.0.8:8080/api';

const adminApi = axios.create({ baseURL });

adminApi.interceptors.request.use( ( config: AxiosRequestConfig ) => {
  const token = localStorage.getItem('token');

  if( token ) {
    config.headers['x-token'] = token;
  }
  
  return config;
});

export default adminApi;
