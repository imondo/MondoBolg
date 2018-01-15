// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'element-ui/lib/theme-default/index.css';
import 'styles/font-awesome.less';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'highlight.js/styles/tomorrow.css';
import 'styles/index.less';
import router from 'router/index';
import store from 'store/index';
import * as filters from 'filters/index';
import touch from 'vue-directive-touch';
import { getToken } from 'utils/auth';
import { currentUser } from 'api/login';
import { retrieval, requestAnimFrame } from 'utils/index';
import {
  MessageBox,
  Message,
  Notification,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  DatePicker,
  TimePicker,
  Slider,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Dialog,
  Pagination,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';
import AV from 'leancloud-storage';

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY
});

// Vue.config.productionTip = false

Vue.use(touch);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

const components = [
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  DatePicker,
  TimePicker,
  Slider,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Dialog,
  Pagination,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem
];
// 推荐该引用
components.forEach((item) => {
  Vue.component(item.name, item);
});

const MsgBox = MessageBox;
Vue.prototype.$msgbox = MsgBox;
Vue.prototype.$alert = MsgBox.alert;
Vue.prototype.$confirm = MsgBox.confirm;
Vue.prototype.$prompt = MsgBox.prompt;

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message; // 需要设置原型
Vue.prototype.$requestAnimFrame = requestAnimFrame;

const whiteList = ['/login', '/hello', '/index', '/classify', '/about', '/article', '/archive', '/search']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  store.commit('SET_ASIDE', true);
  if (to.meta.title) {
    document.title = to.meta.title + ' - Mondo Blog';
  }
  if (getToken()) {
    if (!store.getters.userInfo) {
      let userInfo = currentUser();
      store.dispatch('GetUser', userInfo).then(() => {
        next();
      });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (retrieval(to.path, '/classify') > -1 || retrieval(to.path, '/article') > -1 || retrieval(to.path, '/search') > -1) {
        next();
      } else {
        next('/login');
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
