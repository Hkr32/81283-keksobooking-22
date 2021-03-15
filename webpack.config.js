const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build/'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "source/index.html",
          to: "index.html",
        },
        {
          from: "source/favicon.ico",
          to: "favicon.ico",
        },
        {
          from: "source/img/",
          to: "img",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '/img/[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
};
