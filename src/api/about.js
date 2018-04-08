import axios from '~/utils/axios';

export function handleAbout(data) {
  return axios({
    url: '/api/classes/about',
    method: 'PUT',
    data: data
  });
}

export function addAbout(data) {
  return axios({
    url: '/api/classes/about',
    method: 'post',
    data: data
  });
}

export function getAbout() {
  return axios({
    url: '/api/classes/about',
    method: 'GET'
  });
}
