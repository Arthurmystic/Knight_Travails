const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"], // UPDATE THIS
  },

  // USE THIS AND COMMENT OUT ABOVE IF THOROUGH (BUT SLOWER) DEBUGGING IS PREF
  // Use this and comment out above if thorough (but slower) debugging is prefered
  // to faster and live editing

  //  devtool: 'inline-source-map',
  //  devServer: {
  //    static: './dist',
  //  },
});
