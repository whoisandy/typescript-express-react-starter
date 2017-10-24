const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const ManifestPlugin = require("webpack-manifest-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

module.exports = {
  devtool: "eval-source-map",

  entry: {
    app: [
      "react-hot-loader/patch",
      `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`,
      "./src/client.tsx"
    ]
  },

  output: {
    path: path.resolve(__dirname, "../build/public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },

  resolve: {
    modules: [path.resolve(__dirname, "..src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          }
        ],
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),

    new ManifestPlugin({
      fileName: "../manifest.json"
    }),

    new CheckerPlugin(),
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
