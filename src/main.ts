import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';
import { setupRouter } from './router';
import {
  setupDirectives,
  setupGlobalMethods,
  setupMicroApps,
  setupI18n,
} from '@/plugins';

async function bootstrap() {
  const app = createApp(App);

  // 注册全局指令
  setupDirectives(app);

  // 注册全局方法
  setupGlobalMethods(app);

  // 注册状态管理器
  setupStore(app);

  // 注册微前端
  setupMicroApps();

  // 注册国际化
  const i18n = setupI18n(app);

  // 注册路由
  const router = setupRouter(app, i18n);

  await router.isReady();
  // 挂载dom
  app.mount('#app');
}

void bootstrap();
