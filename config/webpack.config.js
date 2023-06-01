const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function generateHtmlPlugins() {
  const files = glob.sync("./src/*.html");

  return files.map((file) => {
    return new HtmlWebpackPlugin({
      filename: file.replace("src", ""),
      template: file,
    });
  });
}

module.exports = {
  entry: {
    main: "./src/js/index.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    ...generateHtmlPlugins(),

    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "index.html",
    // }),
  ],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.(s?css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  target: "web",
};
