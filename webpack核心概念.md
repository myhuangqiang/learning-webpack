### 一、webpack四大核心

```
1.入口(entry)
2.出口(output)
3.loader
4.插件(plugins)
```

### 二、Entry

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

简单理解：
```
1.代码入口
2.打包入口
3.单个或多个入口
4.多个入口：多页面应用程序；或分开的。
```


示例：

```js
// 单个入口文件
module.exports = {
    entry: 'index.js'
}

// 多个入口文件
module.exports = {
    entry: ['index.js', 'vendor.js']
}

// 另外写法，推荐写法，指定键值
module.exports = {
    entry: {
        index: 'index.js'
    }
}

module.exports = {
    entry: {
        index: 'index.js',
        vendor: 'vendor.js'
    }
}

module.exports = {
    entry: {
        index: ['index.js', 'app.js'],
        vendor: 'vendor.js'
    }
}
```

### 三、Output

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

简单理解：
```
1.打包成的文件（bundle）
2.一个或多个
3.自定义规则
```


示例：

```js
// 单个打包输出文件
module.exports = {
    entry: {
        index: 'index.js'
    },
    output: {
        filename: 'index.min.js'
    },
}

// 多个打包输出文件
module.exports = {
    entry: {
        index: 'index.js',
        vendor: 'vendor.js'
    },
    output: {
        filename: '[name].min.[hash:5].js'
    }
}
```

### 四、Loaders

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

```js
1.处理文件
2.转化为模块
```

示例：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    }
}
```

### 五、Plugins

插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！插件目的在于解决 loader 无法实现的其他事。

其作用:

```
1.参与打包整个过程
2.打包优化和压缩
3.配置编译时的变量
4.极其灵活的
```

示例：

```js
const webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
```
