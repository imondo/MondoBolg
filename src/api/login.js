import AV from 'leancloud-storage';

// 登录
export function login(user, psd) {
  return AV.User.logIn(user, psd);
}

export function loginOut() {
  return AV.User.logOut();
}

// 是否为当前用户
export function currentUser() {
  const user = JSON.parse(JSON.stringify(AV.User.current()));
  return user;
}
