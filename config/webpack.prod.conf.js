const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.dev.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.(ts|js)x?$/,
      exclude: /\/node_modules/,
      parallel: true,
      minify: (file, sourceMap) => {
        const uglifyJsOptions = {
          output: {
            beautify: false,
            comments: false,
          },
          warnings: false,
          compress: {
            drop_console: true,
            collapse_vars: false,
            reduce_vars: false,
          }
        }

        if (sourceMap) {
          uglifyJsOptions.sourceMap = {
            content: sourceMap,
          };
        }

        return require('uglify-js').minify(file, uglifyJsOptions);
      },
    })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ]
});
