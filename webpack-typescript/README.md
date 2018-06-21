### 安装typescript-loader

```
// 两个包随便选择安装一个，我选择安装第二个

官方：npm install typescript ts-loader --save-dev

开源作者：npm install typescript ts-loader awesome-typescript-loader --save-dev
```

### 配置：tsconfig.json

- compilerOptions 
- include
- exclude

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


### 配置：webpack.config.js

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


### 可以安装loadsh插件或库测试

```
npm install loadsh --save
```
打包测试：

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

### 使用声明文件：当你使用lodash，或vue的文件，可以使用他们的声明语法

### 方法一:

举例：
```
npm install @types/lodash
或
npm install @types/vue

反正你想使用什么库声明，可以去GitHub搜他们的声明文件包安装
```

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


### 方法二：

先安装typings，再安装声明文件包（GitHub搜就有）:

```
npm install typings  -g

typings install lodash --save
```

安装成功后，有typings文件，和typings.json文件，那如何使用他们的声明文件呢？

```js
// 首先在tsconfig.json文件写入：
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
