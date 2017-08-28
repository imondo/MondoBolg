import axios from 'axios';
import { getToken } from './auth';

const vueAxios = axios.create({
  baseURL: 'https://leancloud.cn/1.1/'
  // timeout: 5000
});

// 请求拦截器
vueAxios.interceptors.request.use(config => {
  config.headers['X-LC-Id'] = '05I4knkLF3pLp02UB5lfe0FQ-gzGzoHsz';
  config.headers['X-LC-Key'] = 'Nnu56KEHv8hsvqDAyxwPWsgp';
  if (getToken()) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-LC-Session'] = getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截
vueAxios.interceptors.response.use(response => response, error => {
  return Promise.reject(error);
});

export default vueAxios;

