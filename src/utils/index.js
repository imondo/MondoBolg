import Vue from 'vue';

export function conversionData(data) {
  return JSON.parse(JSON.stringify(data));
}

export function retrieval(str, val) {
  return str.indexOf(val);
}

export function errorMessage(msg) {
  return Vue.prototype.$message({
    message: msg,
    type: 'error',
    duration: 2 * 1000
  });
}

export function confirmMessage(content, title, type, callback) {
  let headline = title || '提示';
  let types = type || 'warning';
  return Vue.prototype.$confirm(content, headline, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: types
  });
}

export function dataConversion(data) {
  let arr = [];
  let obj = {};
  if (data instanceof Array) {
    for (var i = 0; i < data.length - 1; i++) {
       let date = data[i].updatedAt.substr(0, 7);
       arr.push(date);
     }
  }
  arr = Array.from(new Set(arr));
  for (var j in arr) {
    obj[arr[j]] = [];
    for (var z = 0; z < data.length - 1; z++) {
      let date = data[z].updatedAt.substr(0, 7);
      if (arr[j] === date) {
        obj[arr[j]].push(data[z]);
      }
    }
  }
  return obj;
}
