const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { entry } = require("./webpack.dev");

module.exports = {
  entry: {
    app: "./src/index.js", // UPDATE THIS if diff entry point
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // UPDATE THIS IF HAVE AN HTML to the html file name
      // title: 'production',  //OR Use this if u want webpack to generate a dynakic htmlfromm scratch
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i, // for css and loading images in js (css-loader does this)
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.html$/i, //for images referenced in html
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // for images loading images
        type: "asset/resource",
      },
    ],
  },
};
