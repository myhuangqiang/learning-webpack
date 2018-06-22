### 学习大纲

- webpack进行配置使用babel插件会将ES6语法进行配置转换成ES5语法
- 配置bobel-loader，以及preset-env
- babel-polyfill
-

### 第一步: 安装babel插件

```
npm install babel-loader@8.0.0-beta.0 @babel/core

npm install @babel/preset-env --save-dev
```


### 第二步: webpack配置

##### 新建名为wepack.config.js文件，进行配置：

```js
module.exports = {
    // 模式为开发模式
    mode: 'development',
    entry: {
        // 入口文件，路径一定要写对
        app: './app.js'
    },
    output: {
        // 输出文件
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                // 正则检查所有的js文件
                test: /\.js$/,
                // 使用的babel-loader转换规则
                use: {
                    loader: 'babel-loader',
                    options: {}
                },
                // 排除不被应用编译
                exclude: '/node_modules/'
            }
        ]
    }
}
```

##### babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。

目前我们写 javascript 代码时，需要使用 N 个 preset，比如：babel-preset-es2015、babel-preset-es2016。es2015 可以把 ES6 代码编译为 ES5，es2016 可以把 ES2016 代码编译为 ES6。babel-preset-latest 可以编译 stage 4 进度的 ECMAScript 代码。

问题是我们几乎每个项目中都使用了非常多的 preset，包括不必要的。例如很多浏览器支持 ES6 的 generator，如果我们使用 babel-preset-es2015 的话，generator 函数就会被编译成 ES5 代码。

babel-preset-env 的工作方式类似 babel-preset-latest，唯一不同的就是 babel-preset-env 会根据配置的 env 只编译那些还不支持的特性。

#### 在根目录下新建.babelrc文件

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions"
          ]
        }
      }
    ]
  ],
}
```

这样就已经完成ES6自动转换成ES5语法。


### babel-polyfill

- Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
- 举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

#### 安装babel-polyfill

```
npm install babel-polyfill --save
```

#### 使用babel-polyfill

```js
// 仅仅需要进入即可
import 'babel-polyfill';
```

#### 安装plugin-transform-runtime

```
npm install @babel/plugin-transform-runtime --save-dev
```

#### 使用plugin-transform-runtime

应用场景是比如你想做个库，你想发布给其他人使用，因为使用的人可能在各种各样的执行环境，使用plugin-transform-runtime就会让你这个包独立环境，不会污染全局环境。

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions"
          ]
        }
      }
    ]
  ],
  "plugins": [
    "@babel/transform-runtime"
  ]
}
```

#### 实现原理：
- babel-polyfill，它不会将代码编译成低版本的ECMAScript，他的原理是当运行环境中并没有实现的一些方法，babel-polyfill中会给做兼容


#### 优缺点：
- babel-polyfill：通过向全局对象和内置对象的prototype上添加方法来实现，比如运行环境中不支持Array-prototype.find，引入polyfill，前端就可以放心的在代码里用es6的语法来写；但是这样会造成全局空间污染。比如像Array-prototype.find就不存在了，还会引起版本之前的冲突。不过即便是引入babel-polyfill，也不能全用，代码量比较大。



#### 如安装错误处理：

npm install 的时候出现错误：

```
npm ERR! Unexpected end of JSON input while parsing near '..."},"peerDependencies"'
```

解决方法：

第一步: `npm cache clean --force`

第二步：`npm install --registry=https://registry.npm.taobao.org
`

### 总结：

```
1.安装babel-loader配置支持ES6语法转换为ES5语法
2.安装babel-polyfill，使得新的ES6, ES7等新的api支持转换
3.安装babel/transform-runtime插件，可以应用开发代码库场景下独立代码环境
```