const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const webpack = require('webpack');

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".jsx", ".js"],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: "/node_modules/",
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
