import Pagination from './Pagination/index.vue';
import Tag from './Tags/index.vue';
import UploadDialog from './upload-dialog/index.vue';
import SmoothUp from './smooth-up/index.vue';
import LightBox from './Lightbox/index.vue';

const components = [
  Pagination,
  Tag,
  UploadDialog,
  SmoothUp,
  LightBox
];

const install = (Vue) => {
  components.map(component => { Vue.component(component.name, component)});
}
export default {
  install
}