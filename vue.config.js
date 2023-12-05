const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views"
      }
    }
  },
  chainWebpack(config){
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  }
});