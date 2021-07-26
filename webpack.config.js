const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    dom_loader: "./src/dom_loader.js",
    app: "./src/app.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Task Master",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
