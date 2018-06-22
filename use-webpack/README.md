### 使用webpack命令进行打包文件

##### 我们在命令行中输入：`webpack -h`看看webpack的命令行大全

```
Usage: webpack-cli [options]
       webpack-cli [options] --entry <entry> --output <output>
       webpack-cli [options] <entries...> --output <output>
```

##### webpack告诉我们，用webpack进行打包有三种方法：

```
1.新建为webpack.config.js命名的文件，可以直接webpack命令打包

2.webpack 入口文件<app.js> -o 输出文件<bundle.js>

3.webpack --config 你自定义的文件名字<webpack-default.js>
```

##### 首先，新建一个目录，新建一个sum.js文件，这个文件主要是用es6 module暴露一个加法函数方法：

```js
// sum.js
export default function sum(a, b) {
    return a + b;
}
```

##### 然后，新建一个app.js入口文件（webpack要打包这个文件）

```js
// app.js

// es6 module规范
import sum from './sum'

// 调用
console.log('sum(23,24) = ', sum(23, 24));
```

##### 最后，使用第三种打包命令进行打包：

```
webpack app.js -o bundle.js
```

##### 如果打包成功显示：

```
Hash: 7e137d767d2665688484
Version: webpack 4.5.0
Time: 588ms
Built at: 2018-6-20 20:30:06
      Asset       Size  Chunks             Chunk Names
0.bundle.js  188 bytes       0  [emitted]
  bundle.js   1.84 KiB       1  [emitted]  main
Entrypoint main = bundle.js
   [0] ./app.js + 1 modules 466 bytes {1} [built]
       | ./app.js 411 bytes [built]
       | ./sum.js 55 bytes [built]
   [1] ./minus.js 54 bytes {1} [built]
   [2] ./muti.js 114 bytes {0} [built]
```

### 总结：

##### 我们学会了三种webpack打包命令，分别是：

```
1.新建为webpack.config.js命名的文件，可以直接webpack命令打包

2.webpack 入口文件<app.js> -o 输出文件<bundle.js>

3.webpack --config 你自定义的文件名字<webpack-default.js>
```