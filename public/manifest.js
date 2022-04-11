// 配置清单文件
window.manifest = {
  API: '//192.168.49.91:86/iot-api', //Api请求
  IMG: '//127.0.0.1', // 图片地址
  NAME: '主应用',
  APPS: [
    // 子应用
    {
      name: 'micro-sub',
      entry: '//localhost:8081',
      container: '#app',
      activeRule: '/micro-sub',
    },
  ],
};
