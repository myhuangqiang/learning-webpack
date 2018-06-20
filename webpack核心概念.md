### 一、webpack核心概念

```
1.Entry
2.Output
3.Loaders
4.Plugins
```

### 二、Entry

```
代码入口

打包入口

单个或多个入口，多个入口：多页面应用程序；或分开的。
```

示例：

```js
// 单个
module.exports = {
    entry: 'index.js'
}

// 多个入口
module.exports = {
    entry: ['index.js', 'vendor.js']
}

// 另外写法，推荐写法
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

```
打包成的文件（bundle）
一个或多个
自定义规则
```

示例：

```js
// 单个输出
module.exports = {
    entry: {
        index: 'index.js'
    },
    output: {
        filename: 'index.min.js'
    },
}

// 多个输出
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