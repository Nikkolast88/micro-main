// import { App } from 'vue';
import { registerMicroApps, start } from 'qiankun';
// import {
//   ElButton, 
//   ElMenu,
// } from 'element-plus';

// const components = [
//   ElButton,
//   ElMenu,
// ];

// export function registerComp(app: App): void {
//   components.forEach(component => {
//     app.component(component.name, component);
//   });
// }

const apps = [
  {
    name: 'Vue3',
    entry: process.env.VUE_APP_SUB_VUE as string,
    container: '#app',
    activeRule: '/#/vue3',
  },
];
export function registerMicro(): void {
  registerMicroApps(apps);
  start();
}