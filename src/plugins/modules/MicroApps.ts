import { registerMicroApps, start, RegistrableApp, ObjectType } from 'qiankun';

/**
 * @description: 传递到子应用
 * @param {*}
 * @return {*}
 */
const props = {
  data: {},
};
const appList = window.manifest.APPS;
const apps: RegistrableApp<ObjectType>[] = [];

appList.forEach((app: RegistrableApp<ObjectType>) => {
  apps.push({
    ...app,
    props: {
      ...props,
      routes: [],
      routerBase: app.activeRule,
    },
  });
});

/**
 * @description: 注册微服务
 * @param {*}
 * @return {*}
 */
export function setupMicroApps(): void {
  registerMicroApps(apps);
  start();
}
