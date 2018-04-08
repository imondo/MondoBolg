import axios from 'axios';
import NProgress from 'nprogress';
import { Message } from 'element-ui';
import handleToken from './token';

axios.default.timeout = 20000; // 响应时间
axios.defaults.withCredentials = true; // 传递cookie
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // post请求头

// 参数序列化
axios.interceptors.request.use(config => {
  NProgress.start();
  return handleToken.getToken().then(token => {
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
  })
}, error => {
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  NProgress.done();
  if (response.status !== 200) {
    return Promise.reject(response);
  }
  return response.data;
}, error => {
  NProgress.done();
  // 错误消息提示
  let { status, data: { message }, config: { url } } = error.response;
  switch (status) {
    case 401:
      message = '权限认证失败，请重新登录！';
      break;
    case 500:
      message = '服务器连接出错！';
      break;
    default:
      break;
  }
  Message({
    type: 'error',
    message,
    onClose: () => {
      if (status === 401) {
        handleToken.removeToken().then(() => {
          window.location.href = window.location.origin + '/login';
        })
      }
    }
  })
  return Promise.reject(error);
})

export default axios;
