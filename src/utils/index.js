export function dataConversion(data) {
  let arr = [];
  let obj = {};
  let conversion = [];
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
    conversion.push(obj);
  }
  return conversion;
}
