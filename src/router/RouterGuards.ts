import { Router } from 'vue-router';
/**
 * @description: 路由守卫
 * @param {Router} router
 * @return {*}
 */
export function createRouterGuards(router: Router): void {
  // 路由进入前
  router.beforeEach(async () => {
    console.log('');
  });
}
