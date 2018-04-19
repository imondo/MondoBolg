// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/font-awesome.less';
import 'nprogress/nprogress.css';
import 'highlight.js/styles/tomorrow.css';
import './styles/app.less';
import router from './router/index';
import store from './store/index';
import * as filters from './filters/index';
import touch from 'vue-directive-touch';
import VueLazyload from 'vue-lazyload';
import { requestAnimFrame } from './utils/index';
import {
  MessageBox,
  Message,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Tag,
  Upload,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';
import MoComponents from './components/index';
import AV from 'leancloud-storage';
import marked from '~/utils/marked';
import img404 from '~/assets/404.png';
import loadImg from '~/assets/loading.gif';

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY
});

Vue.config.productionTip = false;

Vue.use(touch);
Vue.use(MoComponents);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: img404,
  loading: loadImg,
  attempt: 1
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

const components = [
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Option,
  Tag,
  Upload,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem
];
// 推荐该引用
components.forEach((item) => {
  Vue.component(item.name, item);
});

Vue.prototype.$message = Message; // 需要设置原型
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$marked = marked;
Vue.prototype.$requestAnimFrame = requestAnimFrame;

router.beforeEach(({ meta }, from, next) => {
  store.commit('SET_ASIDE', true);
  meta.title ? document.title = meta.title + ' - Mondo Blog' : '';
  store.dispatch('GetUser').then(token => {
    if (meta.auth) {
      token ? next() : next({name: 'login'});
    } else {
      next();
    }
  })
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
