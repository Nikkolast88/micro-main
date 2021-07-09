module.exports = {
  devServer: {
    port: 8000,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    // config.module.rule('ts')
    // .use('ts-loader');
    // config.module.rule('ts')
    // .use('babel-loader');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
    
    config.module.rule('ts')
    .use('ts-loader');
  },
  configureWebpack: config => {
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    };
  },
};
