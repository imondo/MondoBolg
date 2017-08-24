// 时间戳转换
export function formatDate(val) {
  return val.substr(0, 10);
}

// 归档时间转换
export function timeConversion (val) {
  return val.replace('-', '年') + '月';
}
