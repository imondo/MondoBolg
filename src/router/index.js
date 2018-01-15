import Vue from 'vue';
import Router from 'vue-router';

const layout = resolve => require(['components/Layout/index'], resolve);
const indexView = resolve => require(['views/index/index'], resolve);
const articleView = resolve => require(['views/article/article'], resolve);
const aboutView = resolve => require(['views/about/about'], resolve);
const classifyView = resolve => require(['views/classify/classify'], resolve);
const archiveView = resolve => require(['views/archive/archive'], resolve);
const helloView = resolve => require(['views/hello/index'], resolve);

// admin
const loginView = resolve => require(['views/Login/login'], resolve);
const LayoutView = resolve => require(['views/admin/layout/layout'], resolve);
const articleListView = resolve => require(['views/admin/manageView/articleList'], resolve);
const editView = resolve => require(['views/admin/manageView/edit'], resolve);

Vue.use(Router);

export const RouterMap = [
  {
    path: '/hello',
    name: 'hello',
    meta: {title: 'hello'},
    component: helloView
  },
  {
    path: '/login',
    name: 'login',
    meta: {isLogin: true, title: '登录'},
    component: loginView
  },
  {
    path: '/',
    redirect: '/hello',
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
      },
      {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/create',
        component: LayoutView,
        children: [
          {path: 'user', component: articleListView, meta: {title: '我的'}},
          {path: 'edit/:id', component: editView, name: 'edit', meta: {isEdit: true, isRoute: true, title: '编辑'}},
          {path: 'create', component: editView, name: 'create', meta: {isRoute: true, title: '发布'}},
          {path: 'aboutCreate', component: editView, name: 'aboutCreate', meta: {isAbout: true, isRoute: true, title: '关于编辑'}}
        ]
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: RouterMap,
  linkActiveClass: 'active'
});
