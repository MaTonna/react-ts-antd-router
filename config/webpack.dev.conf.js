const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'index': ['./src/pages/index'],
    'login': ['./src/pages/login'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: '/node_modules',
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader',
          options: {
            importLoaders: 1
          }
        }
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[ext]',
          outputPath: '../dist/',
          publicPath: '/'
        }
      }
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      PropTypes: 'prop-types',
      moment: 'moment'
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../dist'),
      manifest: require('./vendor-manifest.json'),
      name: 'vendor'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, '../src/models'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@img': path.resolve(__dirname, '../src/img'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 9000,
    open: true,
    index: '../dist/index.html',
    hot: true,
  }
};
