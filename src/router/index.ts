import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouterGuards } from './RouterGuards';

const modules = require.context('./modules', true, /\.ts$/);

const routeModules: RouteRecordRaw[] = [];

modules.keys().forEach((key: string) => {
  const mod = modules(key).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModules.push(...modList);
});

export function setupRouter(app: App): Router {
  const constantRouter: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/System/index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue'),
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter,
  });
  app.use(router);
  /**
   * @description: 路由守卫
   * @param {*}
   * @return {*}
   */
  createRouterGuards(router);
  return router;
}

// export default router;
