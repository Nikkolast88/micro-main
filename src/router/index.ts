import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouterGuards } from './RouterGuards';
import { constantRouter } from './constantRouter';
const modules = require.context('./modules', true, /\.ts$/);

const routeModules: RouteRecordRaw[] = [];

modules.keys().forEach((key: string) => {
  const mod = modules(key).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModules.push(...modList);
});

export function setupRouter(app: App): Router {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRouter, ...routeModules],
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
