// import { App } from 'vue';
import { registerMicroApps, start } from 'qiankun';
const { buildConfig } = require('../../buildConfig.json');
const env = process.env.NODE_ENV || '';
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
    name: 'micro-sub',
    entry: `${buildConfig[env] ? buildConfig[env] + 'micro-sub/' : '//localhost:3000'}`,
    container: '#app',
    activeRule: '/micro-sub',
  },
];
console.log(apps);
export function registerMicro(): void {
  registerMicroApps(apps);
  start();
}