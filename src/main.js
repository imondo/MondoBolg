// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './router/index';
import store from './store/index';
import * as filters from './filters/index';
import touch from 'vue-directive-touch';

// Vue.config.productionTip = false

Vue.use(iView);
Vue.use(touch);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

router.beforeEach((to, from, next) => {
  store.commit('SET_ASIDE', true);
  NProgress.start();
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
