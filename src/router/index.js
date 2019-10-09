import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },

  {
    path: '/post/create',
    component: Layout,
    children: [
      {
        path: '',
        name: 'CreatePost',
        component: () => import('@/views/post/create'),
        meta: { title: '新建文章', icon: 'write' }
      }
    ]
  },

  {
    path: '/post/manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ManagePost',
        component: () => import('@/views/post/manage'),
        meta: { title: '文章管理', icon: 'article' }
      }
    ]
  },

  {
    path: '/post/edit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':id(\\d+)',
        name: 'EditPost',
        component: () => import('@/views/post/edit'),
        meta: { title: '编辑文章', noCache: true, icon: 'article' }
      }
    ]
  },

  {
    path: '/page/manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ManagePage',
        component: () => import('@/views/page/manage'),
        meta: { title: '页面管理', icon: 'page' }
      }
    ]
  },

  {
    path: '/page/edit',
    hidden: true,
    component: Layout,
    children: [
      {
        path: ':id(\\d+)',
        name: 'EditPage',
        component: () => import('@/views/page/edit'),
        meta: { title: '编辑页面', noCache: true, icon: 'page' }
      }
    ]
  },

  {
    path: '/page/create',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'CreatePage',
        component: () => import('@/views/page/create'),
        meta: { title: '新建页面', icon: 'page' }
      }
    ]
  },

  {
    path: '/category/manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ManageCategory',
        component: () => import('@/views/meta/category/manage'),
        meta: { title: '分类管理', icon: 'category' }
      }
    ]
  },

  {
    path: '/category/create',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'CreateCategory',
        component: () => import('@/views/meta/category/create'),
        meta: { title: '新建分类', icon: 'category' }
      }
    ]
  },

  {
    path: '/category/edit',
    hidden: true,
    component: Layout,
    children: [
      {
        path: ':id(\\d+)',
        name: 'EditCategory',
        component: () => import('@/views/meta/category/edit'),
        meta: { title: '编辑分类', noCache: true, icon: 'category' }
      }
    ]
  },

  {
    path: '/tag/manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ManageTag',
        component: () => import('@/views/meta/tag/manage'),
        meta: { title: '标签管理', icon: 'tag' }
      }
    ]
  },

  {
    path: '/tag/create',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'CreateTag',
        component: () => import('@/views/meta/tag/create'),
        meta: { title: '新建标签', icon: 'tag' }
      }
    ]
  },

  {
    path: '/tag/edit',
    hidden: true,
    component: Layout,
    children: [
      {
        path: ':id(\\d+)',
        name: 'EditTag',
        component: () => import('@/views/meta/tag/edit'),
        meta: { title: '编辑标签', noCache: true, icon: 'tag' }
      }
    ]
  },

  {
    path: '/comment/index',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'comment' }
      }
    ]
  },

  {
    path: '/upload/index',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Upload',
        component: () => import('@/views/upload/index'),
        meta: { title: '附件管理', icon: 'upload' }
      }
    ]
  },

  {
    path: '/user/manage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ManageUser',
        component: () => import('@/views/user/manage'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/user/create',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'CreateUser',
        component: () => import('@/views/user/create'),
        meta: { title: '新建用户', icon: 'user' }
      }
    ]
  },

  {
    path: '/user/edit',
    hidden: true,
    component: Layout,
    children: [
      {
        path: ':id(\\d+)',
        name: 'EditUser',
        component: () => import('@/views/user/edit'),
        meta: { title: '编辑用户', noCache: true, icon: 'user' }
      }
    ]
  },

  {
    path: '/setting/index',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '网站设置', icon: 'setting' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/wuyc/xpress',
        meta: { title: '项目地址', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
