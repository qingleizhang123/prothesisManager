const CompresssionPlugin = require('compression-webpack-plugin');
const SC_URL = 'http://10.5.61.46:10087'; // qiang.shen
const BS_URL = 'http://localhost:3000'; // qinglei.zhang

module.exports = {
  lintOnSave: false,
  outputDir: 'dist', // 构建输出目录
  productionSourceMap: true,
  publicPath: './',
  devServer: {
    open: true,
    host: 'localhost',
    port: 4202,
    https: false,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    proxy: {
      // 配置跨域
      '/api': {
        target: SC_URL, // 这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/api' // 重写,
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: config => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      return {
        performance: {
          hints: 'warning',
          // 入口起点的最大体积 整数类型（以字节为单位）
          maxEntrypointSize: 50000000,
          // 生成文件的最大体积 整数类型（以字节为单位 300k）
          maxAssetSize: 30000000,
          // 只给出 js 文件的性能提示
          assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
          }
        },
        plugins: [
          new CompresssionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      };
    } else {
      config.output.devtoolModuleFilenameTemplate = info => {
        const resPath = info.resourcePath;
        if (
          (/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) ||
          /node_modules/.test(resPath)
        ) {
          return `webpack:///${resPath}?${info.hash}`;
        }
        return `webpack:///${resPath.replace('./src', 'SouceCode')}`;
      };
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
    if (process.env.analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
};
