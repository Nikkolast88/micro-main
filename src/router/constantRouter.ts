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
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
    },
  },
];
export { constantRouter };
