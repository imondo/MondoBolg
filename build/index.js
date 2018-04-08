const dev = require('./dev');
const build = require('./build');

const webpackDev = require('./webpack.dev');
const webpackProduction = require('./webpack.prod');

const mergePath = process.env.NODE_ENV === 'production' ? webpackProduction : webpackDev;
const assetsPublicPath = process.env.NODE_ENV === 'production'? build.PUBLICPATH: dev.PUBLICPATH;
const version = process.env.NODE_ENV === 'production'? build.VERSION: dev.VERSION;

module.exports = {
  assetsPublicPath: assetsPublicPath.replace(/\"/g, ""),
  version: version.replace(/\"/g, ""),
  mergePath
}