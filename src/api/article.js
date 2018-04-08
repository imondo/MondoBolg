import axios from '~/utils/axios';

export function getArtcileList(data) {
  return axios({
    url: '/api/classes/article',
    method: 'GET',
    params: data
  });
}

export function getArtcile(id) {
  return axios({
    url: `/api/classes/article/${id}`,
    method: 'GET'
  });
}
export function updateArtcile(data) {
  return axios({
    url: '/api/classes/article',
    method: 'PUT',
    data: data
  });
}

export function getClassify(data) {
  return axios({
    url: '/api/classes/classify',
    method: 'GET',
    params: data
  });
}

// 新增文章
export function addArticle(data) {
  return axios({
    url: '/api/classes/article',
    method: 'POST',
    data: data
  });
}

// 删除文章
export function delArticle(id) {
  return axios({
    url: '/api/classes/article/' + id,
    method: 'DELETE'
  });
}
