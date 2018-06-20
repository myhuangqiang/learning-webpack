// es6 module规范
import sum from './sum'

// CommonJS规范
const mins = require('./minus');

// AMD规范
require(['./muti'], function (muti) {
    console.log('muti(23, 24) = ', muti(23, 24));
})

console.log('sum(23,24) = ', sum(23, 24));
console.log('mins(23,24) = ', mins(23, 24));

/**
 * 三个打包方式
 * webpack app.js -o bundle.js
 * webpack --config webpack-default.js
 * 自定义webpack.config.js文件名字，直接webpack命令打包
 */


