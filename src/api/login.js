import AV from 'leancloud-storage';
import vueAxios from 'utils/axios';

// 登录
export function login(user, psd) {
    return vueAxios({
      url: '/login',
      method: 'POST',
      data: {
        username: user,
        password: psd
      }
    });
}

export function loginOut() {
  return AV.User.logOut();
}

// 是否为当前用户
export function currentUser() {
  return vueAxios({
    url: '/users/me',
    method: 'GET'
  });
}
