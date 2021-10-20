import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/components/Layout';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: {},
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {},
      },
    ],
  },
];

export default routes;
