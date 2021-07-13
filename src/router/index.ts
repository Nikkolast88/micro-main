import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { UserLayout } from '@/layout';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
