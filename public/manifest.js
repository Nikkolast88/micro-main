window.manifest = {
  API: '//192.168.49.91:86/iot-api',
  IMG: '//',
  NAME: '主应用',
  APPS: [
    {
      name: 'micro-sub',
      entry: '//localhost:8081',
      container: '#app',
      activeRule: '/#/micro-sub'
    }
  ]
};
