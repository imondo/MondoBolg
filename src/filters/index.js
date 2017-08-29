// 时间戳转换
export function formatDate(val, index) {
  let i = index || 10;
  if (val.length > index) {
    return val.substr(0, i) + '...';
  } else {
    return val.substr(0, i);
  }
}

// 归档时间转换
export function timeConversion (val) {
  return val.replace('-', '年') + '月';
}
