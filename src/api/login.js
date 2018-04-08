import axios from '~/utils/axios';

// 登录
export function login(data) {
  return axios({
    url: '/api/login',
    method: 'POST',
    data: data
  })
}

// 注册
export function register(data) {
  return axios({
    url: '/api/register',
    method: 'POST',
    data: data
  })
}