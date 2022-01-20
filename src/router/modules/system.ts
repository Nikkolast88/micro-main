import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constantRouter';
import { renderIcon } from '@/utils';
import { Config } from '@icon-park/vue-next';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: renderIcon(Config),
    },
    children: [
      {
        path: '/system/index',
        name: 'System',
        component: () => import('@/views/System/SystemView.vue'),
        meta: {
          title: '系统管理',
        },
      },
    ],
  },
];

export default routes;
