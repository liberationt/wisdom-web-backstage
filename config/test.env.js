'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  // API_HOST: '"http://dev.loan.zanfin.com/api/proxy"' // 正式环境接口地址(这里是增加的内容)
  API_HOST: '"/api/proxy"'
})
