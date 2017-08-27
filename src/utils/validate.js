// 用户名
export function isUserName(val) {
    const reg = /^[0-9A-Za-z]+$/;
    return reg.test(val);
}
