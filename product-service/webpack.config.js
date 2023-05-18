const slsw = require('serverless-webpack');
const path = require("path");

module.exports = {
  entry: slsw.lib.entries,
  externals: [{ "aws-sdk": "commonjs aws-sdk" }], // <-- additional line
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
}