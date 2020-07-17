const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const mode = isProd ? "production" : "development";

module.exports = {
  mode,
  output: {
    globalObject: "self",
    filename: "[name].js",
    chunkFilename: "[name].[id].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new MonacoWebpackPlugin()],
  devtool: isProd ? "source-map" : "inline-source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
};
