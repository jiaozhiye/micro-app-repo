/*
 * @Author: 焦质晔
 * @Date: 2021-02-08 14:35:05
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2023-07-12 09:57:04
 */
'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    app: path.resolve(__dirname, './index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    library: `dms-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_dms`,
    globalObject: 'window',
  },
  resolve: {
    // 配置解析规则
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      // js jsx
      {
        test: /\.js(x)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      // css
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      // images
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset',
        generator: { filename: 'img/[contenthash:8][ext][query]' },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      overlay: false,
      progress: true,
    },
    host: 'localhost',
    port: '9021',
    hot: true,
    open: true,
    proxy: {},
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: 'body',
    }),
  ],
};
