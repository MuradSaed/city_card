const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint检查
  assetsDir: "static", // 静态资源目录
  parallel: false, // 关闭并行构建
  publicPath: "./", // 公共路径
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/geoserveraddress': {
        target: 'https://www.altnccq.org.cn', // 目标后端服务器地址
        changeOrigin: true, // 是否改变源地址
        secure: true, // 是否信任代理服务器的SSL证书
        // pathRewrite: {
        //   '^/geoserveraddress': '' // 重写路径
        // }
      },
      "/sp": {
        target: "http://182.92.190.80:81",
        changeOrigin: true,
        pathRewrite: {
          "^/sp": "",
        },
      },

      "/tdgl": {
        target: "http://120.46.87.47:8050",
        changeOrigin: true,
        pathRewrite: {
          "^/tdgl": "",
        },
      },

      "/jsyzhineng": {
        target: "http://api.jsyzhineng.com:9005/openapi",
        changeOrigin: true,
        pathRewrite: {
          "^/tdgl": "",
        },
      },
    },
    allowedHosts: "all",
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/common.scss";`,
      },
    },
  },
});
