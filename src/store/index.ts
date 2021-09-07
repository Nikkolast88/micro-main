import { App } from 'vue';
import { createStore } from 'vuex';

// 加载所有模块。
function loadModules() {
  const context = require.context('./modules', false, /([a-z_]+)\.ts$/i);

  const modules = context
    .keys()
    .map((key) => ({
      key,
      name: key.replace(/^\.\/(.*)\.\w+$/, '$1'),
    }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {},
    );

  return { context, modules };
}

const { context, modules } = loadModules();

const store = createStore({
  modules,
});

if (module.hot) {
  // 在任何模块发生改变时进行热重载。
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();
    store.hotUpdate({
      modules,
    });
  });
}

export function setupStore(app: App<Element>): void {
  app.use(store);
  console.log(store);
}

export default store;
