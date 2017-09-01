import vueAxios from 'utils/axios';

export function handleAbout(data, id) {
  return vueAxios({
    url: 'classes/About/' + id,
    method: 'PUT',
    data: data
  });
}
export function getAbout() {
  return vueAxios({
    url: 'classes/About',
    method: 'GET'
  });
}
