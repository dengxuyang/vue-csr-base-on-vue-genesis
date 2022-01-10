const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
        .set("@", resolve("src"))
        .set("@assets", resolve("src/assets"))
        .set("@components", resolve("src/components"))
        .set("@views", resolve("src/views"))
        .set("@network", resolve("src/network"))
        .set("@common", resolve("src/common"))
        .set("@minio", resolve("src/minio"))

    config.plugin('html').tap(args => {
        args[0].title = 'ssrTest';
        return args;
    })

},
    devServer: {
      proxy: 'http://localhost:3000'
    }
  }