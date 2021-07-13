// import { App } from 'vue';
import { registerMicroApps, start } from 'qiankun';
import { apps } from '@/config/apps';

export function registerMicro(): void {
  registerMicroApps(apps);
  start();
}