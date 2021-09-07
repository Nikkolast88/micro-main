// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
  devServer: {
    port: 8080,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'));
  },
};
