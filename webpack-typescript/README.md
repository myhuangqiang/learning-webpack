### 安装
webpack配置支持typescript，需要安装typescript-loader

```
// 两个包随便选择安装一个，我选择安装第二个

官方：npm install typescript ts-loader --save-dev

开源作者：npm install typescript ts-loader awesome-typescript-loader --save-dev
```

安装成功后，目录下会自动生成一个tsconfig.json文件：
### 首先：配置tsconfig.json

参数：
- compilerOptions
- include
- exclude

示例：
```js
{
  "compilerOptions": {
    // 规范
    "module": "commonjs",
    // 编译后的语法规范
    "target": "es5",
    "allowJs": true
  },
  // 匹配文件
  "include": [
    "./src/*"
  ],
  // 排除文件
  "exclude": [
    "./node_modules"
  ]
}
```

新建一个webpack.config.js文件
### 然后：配置webpack.config.js

```js
module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
```


### 测试阶段：安装loadsh插件或其他库测试

```
npm install loadsh --save
```
进行`webpack`命令成功打包测试：

```
➜  webpack-typescript git:(master) ✗ webpack
Hash: b6a54f5892e9b81f5b0e
Version: webpack 4.5.0
Time: 2384ms
Built at: 2018-6-21 10:55:59
        Asset     Size  Chunks             Chunk Names
app.bundle.js  550 KiB     app  [emitted]  app
Entrypoint app = app.bundle.js
[../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {app} [built]
[../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {app} [built]
[./src/app.ts] 278 bytes {app} [built]
    + 1 hidden module
```

### 什么是声明文件？

当我们使用vuejs开发，官方有vuejs的规范，或者你使使用其他库或框架，也有其他库的语法规范，那么我们如何是配置规范这些库或开源框架的规范呢，没错，就是使用它们的声明文件。

#### 声明文件，方法一：

举例，我要配置lodash声明文件，和vuejs声明文件，就直接安装以下代码：
```
npm install @types/lodash
或
npm install @types/vue

反正你想使用什么库声明，可以去GitHub搜他们的声明文件包安装
```

好比，我现在安装完成了lodash的声明文件，我故意写错语法：不能进行打包

```
// 错误写法不能被打包：
import * as _ from 'lodash'

console.log(_.chunk(2));
```


```
ERROR in /Users/bob/Documents/myproject/learning-webpack/webpack-typescript/src/app.ts
./src/app.ts
[tsl] ERROR in /Users/bob/Documents/myproject/learning-webpack/webpack-typescript/src/app.ts(3,21)
      TS2345: Argument of type '2' is not assignable to parameter of type 'ArrayLike<{}>'.
```

提示报错，必须传一个数组对象

```js
// 正确语法会成功打包：

import * as _ from 'lodash'

console.log(_.chunk([1, 2, 3, 4, 5], 2));
```


#### 声明文件，方法二：

先安装typings，再安装声明文件包（GitHub搜就有）:

```
npm install typings  -g

typings install lodash --save
```

安装成功后，有typings文件，和typings.json文件，那如何使用他们的声明文件呢？

需要在tsconfig.json文件写入：
```js
"compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "allowJs": true,

    // 添加使用的库声明
    "typeRoots": [
      "./node_modules/@type",
      "./typings/modules"
    ]
  },
```

语法正确的话会成功打包：

```js
// 正确语法会成功打包：

import * as _ from 'lodash'

console.log(_.chunk([1, 2, 3, 4, 5], 2));
```

```
➜  webpack-typescript git:(master) ✗ webpack
Hash: 62f7d372b0280d5b3bf9
Version: webpack 4.5.0
Time: 2015ms
Built at: 2018-6-21 11:11:50
        Asset     Size  Chunks             Chunk Names
app.bundle.js  550 KiB     app  [emitted]  app
Entrypoint app = app.bundle.js
[../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {app} [built]
[../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {app} [built]
[./src/app.ts] 278 bytes {app} [built]
    + 1 hidden module
➜  webpack-typescript git:(master) ✗
```

### 总结：

```
1.安装typescript-loader，配置支持typescript
2. 使用框架或库的声明文件，规范语法
```