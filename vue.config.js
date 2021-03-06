const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const package = require('./package.json');
const dayjs = require('dayjs');
// const assetPath = process.env.VUE_APP_ASSET_URL;
const fileName =
  package.name + '-' + package.version + '-' + dayjs().format('YYYYMMDD-HHmm');
module.exports = {
  publicPath: '/',
  productionSourceMap: process.env.NODE_ENV === 'development',
  outputDir: fileName,
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    loaderOptions: {
      // 自定义主题
      scss: {
        // eslint-disable-next-line quotes
        additionalData: `@use '@/styles/variables.scss' as *;`,
      },
    },
  },
  chainWebpack: (config) => {
    // const svgRule = config.module.rule('svg');

    // svgRule.uses.clear();
    config.resolve.alias.set('@', path.resolve('./src/'));

    // svgRule
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader');
    // svgRule
    //   .oneOf('component')
    //   .resourceQuery(/component/)
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
    //   .end()
    //   .end()
    //   .oneOf('external')
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: 'assets/[name].[hash:8].[ext]',
    //   });
    // config.module
    //   .rule('fonts')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 4096, // 小于4kb将会被打包成 base64
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         name: 'fonts/[name].[hash:8].[ext]',
    //         assetPath,
    //       },
    //     },
    //   })
    //   .end();
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: 10240, // 小于4kb将会被打包成 base64
    //     fallback: {
    //       loader: 'file-loader',
    //       options: {
    //         name: 'img/[name].[hash:8].[ext]',
    //         assetPath,
    //       },
    //     },
    //   });
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
        useSource: true,
      }),
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
