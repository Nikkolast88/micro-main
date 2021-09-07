import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: () => import('@/views/System/index.vue'),
  },
];

export default routes;
