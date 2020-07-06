// ---- MODE PRODUCTION
const merge = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common");
const buildWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",
  plugins: []
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
