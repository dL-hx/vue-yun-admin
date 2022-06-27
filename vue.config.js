// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//
//   lintOnSave: false   //关闭eslint检查
// })

let proxyObj = {}

proxyObj['/']={
  // websocket
  ws:false,
  //目标地址
  target:'http://localhost:8081',
  // 发送请求头host, 会被设置为target
  changeOrigin:true,
  pathReWrite:{
    '^/':'/'
  }
}
module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  },
  lintOnSave: false
}
