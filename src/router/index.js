import Vue from 'vue';
import Router from 'vue-router';

const layout = resolve => require(['~/components/Layout/index'], resolve);
const indexView = resolve => require(['~/views/index/index'], resolve);
const articleView = resolve => require(['~/views/article/article'], resolve);
const aboutView = resolve => require(['~/views/about/about'], resolve);
const classifyView = resolve => require(['~/views/classify/classify'], resolve);
const archiveView = resolve => require(['~/views/archive/archive'], resolve);
const helloView = resolve => require(['~/views/hello/index'], resolve);

// admin
const loginView = resolve => require(['~/views/login/index'], resolve);
const articleListView = resolve => require(['~/views/admin/manageView/articleList'], resolve);
const editView = resolve => require(['~/views/admin/manageView/edit'], resolve);

Vue.use(Router);

export const routes = [
  {
    path: '*',
    redirect: '/hello'
  },
  {
    path: '/hello',
    name: 'hello',
    meta: {title: 'Hello'},
    component: helloView
  },
  {
    path: '/login',
    name: 'login',
    meta: {isLogin: true, title: '登录'},
    component: loginView
  },
  {
    path: '/index',
    component: layout,
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {title: '首页'},
        component: indexView
      },
      {
        path: '/archive',
        name: 'archive',
        meta: {title: '归档'},
        component: archiveView
      },
      {
        path: '/about',
        name: 'about',
        meta: {title: '关于'},
        component: aboutView
      },
      {
        path: '/article/:id',
        name: 'article',
        meta: {title: '文章'},
        component: articleView
      },
      {
        path: '/classify/:class',
        name: 'classify',
        component: classifyView,
        meta: {className: '分类', title: '分类'}
      },
      {
        path: '/search/:class',
        name: 'search',
        component: classifyView,
        meta: {isSearch: true, className: '搜索', title: '搜索'}
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/create',
    meta: {auth: true},
    component: layout,
    children: [
      {path: 'user', component: articleListView, meta: {auth: true, title: '我的'}},
      {path: 'edit/:id', component: editView, name: 'edit', meta: {auth: true, isEdit: true, isRoute: true, title: '编辑'}},
      {path: 'create', component: editView, name: 'create', meta: {auth: true, isRoute: true, title: '发布'}},
      {path: 'aboutCreate', component: editView, name: 'aboutCreate', meta: {auth: true, isAbout: true, isRoute: true, title: '关于编辑'}}
    ]
  }
];

export default new Router({
  mode: 'hash',
  base: '/' + process.env.PUBLICPATH + '/',
  routes,
  linkActiveClass: 'active'
});
