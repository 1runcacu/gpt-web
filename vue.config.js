const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  lintOnSave:false,
  productionSourceMap:false,
  devServer:{
    port:6789,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts:[
      '*'
    ],
    historyApiFallback: {
      index: '/'
    },
    proxy:{
      // '/api':{
      //     target: 'https://ai.bln.cn/api',
      //     changeOrigin: true,
      //     secure:false,
      //     // pathRewrite: {
      //     //   '/api': ''
      //     // }
      //   }
      },
    },
    chainWebpack: config => {
      // 添加处理html的loader规则
      config.module
        .rule('html')
        .test(/\.html$/)
        .use('html-loader')
        .loader('html-loader')
    }
})
