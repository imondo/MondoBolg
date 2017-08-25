import Vue from 'vue';
import Router from 'vue-router';

const indexView = resolve => require(['../views/index/index'], resolve);
const articleView = resolve => require(['../views/article/article'], resolve);
const aboutView = resolve => require(['../views/about/about'], resolve);
const classifyView = resolve => require(['../views/classify/classify'], resolve);
const archiveView = resolve => require(['../views/archive/archive'], resolve);

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
    path: '/archive',
    name: 'archive',
    component: archiveView
  },
  {
    path: '/about',
    name: 'about',
    component: aboutView
  },
  {
    path: '/article/:id',
    name: 'article',
    component: articleView
  },
  {
    path: '/classify/:class',
    name: 'classify',
    component: classifyView,
    meta: {className: '分类'}
  },
  {
    path: '/search/:class',
    name: 'search',
    component: classifyView,
    meta: {isSearch: true, className: '搜索'}
  }
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: RouterMap,
  linkActiveClass: 'active'
});
