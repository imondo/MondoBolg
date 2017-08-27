// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'highlight.js/styles/tomorrow.css';
import router from './router/index';
import store from './store/index';
import * as filters from './filters/index';
import touch from 'vue-directive-touch';
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
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Dialog,
  Pagination,
  Tooltip
} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

// Vue.config.productionTip = false

Vue.use(iView);
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
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Dialog,
  Pagination,
  Tooltip
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  store.commit('SET_ASIDE', true);
  next();
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
