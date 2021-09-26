import { Router } from 'vue-router';
const childrenPath = window.manifest.APPS.map((el) => el.activeRule);
/**
 * @description: 路由守卫
 * @param {Router} router
 * @return {*}
 */
export function createRouterGuards(router: Router): void {
  // 路由进入前
  router.beforeEach(async (to, form, next) => {
    if (to.name) {
      next();
    }
    if (childrenPath.some((item) => to.path.includes(item))) {
      next();
    }
    next('/404');
  });
}
