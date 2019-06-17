const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer({
                  browsers: ['last 2 versions', 'Android >= 4']
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: DEV ? [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin()
    ] : []
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js']
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    open: true,
    port: 3000
  },
  devtool: DEV ? 'inline-source-map' : false,
  plugins: [
    // consoleに出るメッセージを表示しない
    // https://stackoverflow.com/questions/42196819/disable-hide-download-the-react-devtools
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ]
};
