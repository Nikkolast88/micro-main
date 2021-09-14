window.manifest = {
  API: '//192.168.49.35:93/lamp-solution',
  NAME: '主应用',
  APPS: [
    {
      name: '子应用',
      entry: '//localhost:8081',
      container: '#app',
      activeRule: '/micro-sub'
    }
  ]
};
