const {
  defineConfig
} = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭 eslint 校验
  devServer: {
    proxy: {
      '/api': {
        target: 'http://psychology-test.xdj666.top', // 目标后端地址
        changeOrigin: true, // 修改请求头中的 Origin
        secure: false, // 如果是 https，需设置为 false

      },
    },
  },
});