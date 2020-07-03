const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === "production";
const mode = isProd ? "production" : "development";

const shouldAnalyze = process.env.ANALYZE != null;
const plugins = [new HtmlWebpackPlugin()].concat(
  shouldAnalyze ? [new BundleAnalyzerPlugin()] : []
);
module.exports = {
  mode,
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  plugins,
  devtool: isProd ? "source-map" : "inline-source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
};
