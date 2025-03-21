const {
    defineConfig
} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 关闭 eslint 校验
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://43.139.178.120', // 目标后端地址
                // target: 'http://psychology-test.xdj666.top',
                target: '10.171.119.203',
                changeOrigin: true, // 修改请求头中的 Origin
            },
        },
    },
});