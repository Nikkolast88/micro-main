const env = process.env.NODE_ENV || '';
const { buildConfig } = require('../../buildConfig.json');

const apps = [
  {
    name: 'micro-sub',
    entry: `${
      buildConfig[env] ? buildConfig[env] + 'micro-sub/' : '//localhost:3000'
    }`,
    container: '#app',
    activeRule: '/micro-sub',
  },
];
export { apps };
