import axios from 'axios';

const baseURL = 'http://172.16.12.10:8080/api';

const adminApi = axios.create({ baseURL });

export default adminApi;
