const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./build/index')

const webpackConfig = {
  entry: {
    app: './src/main.js',
    vueVendor: ['vue', 'vuex', 'vue-router','axios'],
    vendor: ['leancloud-storage', 'babel-polyfill'],
    highlight: ['highlight.js', 'marked']
  },
  output: {
    path: path.resolve(__dirname, `./${config.assetsPublicPath}/dist`),
    publicPath: `/${config.assetsPublicPath}/`,
    filename: `build.js?version=${config.version}`
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({
              browsers: ['last 100 versions']
            })
          ]
        }
      },
      {
        test:/\.less$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: ['css-loader','less-loader']
        }),
        include: path.resolve(__dirname,'src/styles')
      },
      {
        test: /\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff2?)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'], // 后缀名自动补全
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve('src'),
      'src': path.resolve(__dirname, '../src'),
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['highlight', 'vendor', 'vueVendor'],
      filename: 'vendor/[name].js'
    }),
    new ExtractTextPlugin("css/[name].[contenthash].css"),
  ]
}

module.exports = merge(webpackConfig, config.mergePath);