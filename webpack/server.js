var path = require("path");
var fs = require("fs");
var webpack = require("webpack");

var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

var config = {
  target: "node",

  externals: nodeModules,

  entry: "./src/server.ts",

  output: {
    path: path.resolve("./build"),
    filename: "server.js",
    publicPath: "/public/",
    libraryTarget: "commonjs2"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};

module.exports = config;
