import Vue from 'vue';
import Router from 'vue-router';

const indexView = resolve => require(['../views/index/index'], resolve);
const articleView = resolve => require(['../views/article/article'], resolve);
const aboutView = resolve => require(['../views/about/about'], resolve);
const classifyView = resolve => require(['../views/classify/classify'], resolve);

Vue.use(Router);

export const RouterMap = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: indexView
  },
  {
    path: '/article/:id',
    name: 'article',
    component: articleView
  },
  {
    path: '/about',
    name: 'about',
    component: aboutView
  },
  {
    path: '/classify/:class',
    name: 'classify',
    component: classifyView
  }
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: RouterMap,
  linkActiveClass: 'active'
});
