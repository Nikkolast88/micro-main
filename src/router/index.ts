import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouterGuards } from './RouterGuards';
import { constantRouter } from './constantRouter';
const modules = require.context('./modules', true, /\.ts$/);
const routeModuleList: RouteRecordRaw[] = [];

modules.keys().forEach((key: string) => {
  const mod = modules(key).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

//需要验证权限
export const asyncRoutes = [...routeModuleList];

export function setupRouter(app: App): Router {
  const router = createRouter({
    history: createWebHistory(),
    routes: [...constantRouter, ...routeModuleList],
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
