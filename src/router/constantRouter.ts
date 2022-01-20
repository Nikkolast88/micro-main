import type { RouteRecordRaw } from 'vue-router';
const constantRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginView.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/Exception/NotFound.vue'),
    meta: {
      title: '404',
    },
  },
];
export const Layout = () => import('@/components/Layout/index.vue');
export { constantRouter };
