// ---- MODE DEVELOPMENT
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common");
const devWebpackConfig = merge(commonWebpackConfig, {
  mode: "development",
  devtool: "#@cheap-module-eval-source-map",
  devServer: {
    contentBase: commonWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
