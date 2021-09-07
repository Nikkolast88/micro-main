import { registerMicroApps, start } from 'qiankun';

/**
 * @description: 注册微服务
 * @param {*}
 * @return {*}
 */
export function setupMicroApps(): void {
  registerMicroApps([]);
  start();
}
