import Vue from 'vue';
import Router from 'vue-router';

const indexView = resolve => require(['views/index/index'], resolve);
const articleView = resolve => require(['views/article/article'], resolve);
const aboutView = resolve => require(['views/about/about'], resolve);
const classifyView = resolve => require(['views/classify/classify'], resolve);
const archiveView = resolve => require(['views/archive/archive'], resolve);

// admin

const loginView = resolve => require(['views/Login/login'], resolve);
const LayoutView = resolve => require(['views/admin/layout/layout'], resolve);
const articleListView = resolve => require(['views/admin/manageView/articleList'], resolve);
const editView = resolve => require(['views/admin/manageView/edit'], resolve);

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
    path: '/login',
    name: 'login',
    meta: {isLogin: true},
    component: loginView
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
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/create',
    component: LayoutView,
    children: [
      {path: 'user', component: articleListView},
      {path: 'edit/:id', component: editView, name: 'edit', meta: {isEdit: true, isRoute: true}},
      {path: 'create', component: editView, name: 'create', meta: {isRoute: true}},
      {path: 'aboutCreate', component: editView, name: 'aboutCreate', meta: {isAbout: true, isRoute: true}}
    ]
  }
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: RouterMap,
  linkActiveClass: 'active'
});
