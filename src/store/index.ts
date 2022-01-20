import { App } from 'vue';
import { createPinia } from 'pinia';

// 模块
import { useUserStore } from './modules/user';
import { useAppStore } from './modules/app';

const store = createPinia();

export function setupStore(app: App<Element>): void {
  app.use(store);
}

export { useUserStore, useAppStore };
