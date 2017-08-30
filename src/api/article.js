import vueAxios from 'utils/axios';

export function getArtcileList(limit, skip) {
  return vueAxios({
    url: 'classes/Article?order=-createdAt&count=1&limit=' + limit + '&skip=' + skip,
    method: 'GET'
  });
}

export function getArtcile(id) {
  return vueAxios({
    url: 'classes/Article/' + id,
    method: 'GET'
  });
}
export function updateArtcile(data, id) {
  return vueAxios({
    url: 'classes/Article/' + id,
    method: 'PUT',
    data: data
  });
}

export function getClassify(data) {
  return vueAxios({
    url: 'classes/Article?order=-createdAt',
    method: 'GET',
    params: data
  });
}

// 新增文章
export function addArticle(data) {
  return vueAxios({
    url: 'classes/Article',
    method: 'POST',
    data: data
  });
}

// 删除文章
export function delArticle(id) {
  return vueAxios({
    url: 'classes/Article/' + id,
    method: 'DELETE'
  });
}
