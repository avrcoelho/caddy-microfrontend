const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist/app4"),
    filename: "[name].[contenthash].js",
    publicPath: "/app4/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: "/app4/index.html",
    },
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
  },
});
