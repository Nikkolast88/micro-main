const path = require('path');
const publicPath = process.env.VUE_APP_IMG_URL;

module.exports = {
  publicPath: '/',
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    config.resolve.alias.set('@', path.resolve('./src'));
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');

    svgRule
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ prefixIds: true }],
        },
      });
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      })
      .end();
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10240, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath,
          },
        },
      });
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
};
