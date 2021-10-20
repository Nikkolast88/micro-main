const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

const assetPath = process.env.VUE_APP_ASSET_URL;

// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
console.log(require('unplugin-element-plus/webpack'));
module.exports = {
  publicPath: '/',
  productionSourceMap: process.env.NODE_ENV === 'development',
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

    svgRule
      .oneOf('component')
      .resourceQuery(/component/)
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
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
            assetPath,
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
            assetPath,
          },
        },
      });
  },
  configureWebpack: {
    // https://github.com/element-plus/element-plus/issues/3923
    // module: {
    //   rules: [
    //     {
    //       test: /\.mjs$/,
    //       include: /node_modules/,
    //       type: 'javascript/auto',
    //     },
    //   ],
    // },
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
      }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          bucket: {
            name: 'bucket',
            test: /[\\/]node_modules[\\/](@vue|vue-router|vuex|vue-i18n)[\\/]/,
            priority: 11,
          },
          elementPlus: {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: 10,
          },
          qiankun: {
            name: 'qiankun',
            test: /[\\/]node_modules[\\/](qiankun|single-spa)[\\/]/,
            priority: 10,
          },
        },
      },
    },
  },
};
