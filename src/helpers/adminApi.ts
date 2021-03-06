import axios, { AxiosRequestConfig } from 'axios';

 //const baseURL = 'http://10.10.1.133:80/api'
const baseURL = 'http://200.52.220.238:71/api';
// const baseURL = 'http://172.16.12.10:8080/api';

const adminApi = axios.create({ baseURL });

adminApi.interceptors.request.use( ( config: AxiosRequestConfig ) => {
  const token = localStorage.getItem('token');

  if( token ) {
    config.headers['x-token'] = token;
  }
  
  return config;
});

export default adminApi;
