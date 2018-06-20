### 安装babel

```
npm install babel-loader@8.0.0-beta.0 @babel/core
```

### 安装babel-preset-env

```
npm install @babel/preset-env --save-dev
```

### 在wepack.config.js配置：

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

### 在根目录下新建.babelrc文件



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

babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。



### 安装babel-polyfill, babel-runtime

```
npm install babel-polyfill --save

npm install @babel/runtime --save
```

### babel-polyfill 使用场景
 - Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。
然后在代码里只需要引入babel-polyfill



```
import 'babel-polyfill';
```


### 安装babel-plugin-transform-runtime

```
npm install @babel/plugin-transform-runtime --save-dev
```

transform-runtime只会对es6的语法进行转换，而不会对新api进行转换。
如果需要转换新api，就要引入babel-polyfill


### babel-runtime 使用场景:
 - Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，例如，{ [name]: 'JavaScript' }

### 实现原理：
- babel-polyfill，它不会将代码编译成低版本的ECMAScript，他的原理是当运行环境中并没有实现的一些方法，babel-polyfill中会给做兼容

- babel-runtime，将es6编译成es5去运行，前端可以使用es6的语法来写，最终浏览器上运行的是es5


### 优缺点：
- babel-polyfill：通过向全局对象和内置对象的prototype上添加方法来实现，比如运行环境中不支持Array-prototype.find，引入polyfill，前端就可以放心的在代码里用es6的语法来写；但是这样会造成全局空间污染。比如像Array-prototype.find就不存在了，还会引起版本之前的冲突。不过即便是引入babel-polyfill，也不能全用，代码量比较大。

- babel-runtime：不会污染全局对象和内置的对象原型。比如当前运行环境不支持promise，可以通过引入babel-runtime/core-js/promise来获取promise，或者通过babel-plugin-transform-runtime自动重写你的promise。但是它不会模拟内置对象原型上的方法，比如Array-prototype.find，就没法支持了，如果运行环境不支持es6，代码里又使用了find方法，就会出错，因为es5并没有这个方法，一般用来做应用程序，比如饿了么UI组件，ivueui组件这些。


### babel-runtime 为什么适合 JavaScript 库和工具包的实现？

- 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；

- 在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill 就行了；


### 如安装错误处理：

npm install 的时候出现错误：

```
npm ERR! Unexpected end of JSON input while parsing near '..."},"peerDependencies"'
```

解决方法：

第一步: `npm cache clean --force`

第二步：`npm install --registry=https://registry.npm.taobao.org
`
