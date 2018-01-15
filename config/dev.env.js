var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LEANCLOUD_APP_ID: '"05I4knkLF3pLp02UB5lfe0FQ-gzGzoHsz"',
  LEANCLOUD_APP_KEY: '"Nnu56KEHv8hsvqDAyxwPWsgp"'
})
