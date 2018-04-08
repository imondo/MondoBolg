const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const build = require('./build');

module.exports = {
  devtool: false,
  output: {
    publicPath: '/dist/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  plugins: (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': build
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './index.html',
      favicon: './static/favicon.ico',
      inject: 'html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: '../dist/static',
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../server'),
        to: '../server',
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../pm2.json'),
        to: '../pm2.json',
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../package.json'),
        to: '../package.json',
        ignore: ['.*']
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}