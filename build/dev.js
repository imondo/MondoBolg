'use strict';
const config = require('./config.json');

module.exports = {
  NODE_ENV: '"development"',
  PUBLICPATH: '"blog"',
  VERSION: '"1.1.0"',
  HOST: '""',
  PORT:'"5000"',
  LEANCLOUD_APP_ID: config.LEANCLOUD_APP_ID,
  LEANCLOUD_APP_KEY: config.LEANCLOUD_APP_KEY,
};