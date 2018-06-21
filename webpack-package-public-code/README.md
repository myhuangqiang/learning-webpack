### 提取公共代码的优点

- 减少代码沉余
- 提高加载熟读
- 插件：CommonsChunkPlugin

### 配置webpack3版本：

```js
{
    plugins: [
        new webpack.optiomize.CommonsChunkPlugin(option)
    ]
}
```


### 配置webpack4以上版本：

```js
new webpack.optimize.SplitChunksPlugin({
    chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
    minSize: 0, // 最小尺寸，默认0
    minChunks: 1, // 最小 chunk ，默认1
    maxAsyncRequests: 1, // 最大异步请求数， 默认1
    maxInitialRequests: 1, // 最大初始化请求书，默认1
    name: function () {
    }, // 名称，此选项可接收 function
    cacheGroups: { // 这里开始设置缓存的 chunks
        priority: 0, // 缓存组优先级
        vendor: { // key 为entry中定义的 入口名称
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: "vendor", // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
    }
}),
```

### 场景：

```
单页应用
单页应用 + 第三方依赖
多页应用 + 第三方依赖 + webpack生成代码
```

### 安装包：

```
// 本地环境使用webpack
npm install webpack --save-dev

// 安装lodash测试第三方包
npm install lodash --save
```

具体代码：

```js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js',
        'commons': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: "manifest"
        }),
    ]
}
```

### 打包测试：

```
➜ $ webpack
Hash: 7c9eaa35dd6e744aae7b
Version: webpack 4.5.0
Time: 650ms
Built at: 2018-6-21 16:13:36
             Asset       Size    Chunks             Chunk Names
  commons.chunk.js  430 bytes   commons  [emitted]  commons
manifest.bundle.js   4.93 KiB  manifest  [emitted]  manifest
    pageA.chunk.js   1.05 KiB     pageA  [emitted]  pageA
    pageB.chunk.js   1.05 KiB     pageB  [emitted]  pageB
   vendor.chunk.js    549 KiB    vendor  [emitted]  vendor
Entrypoint pageA = manifest.bundle.js vendor.chunk.js pageA.chunk.js
Entrypoint pageB = manifest.bundle.js vendor.chunk.js pageB.chunk.js
Entrypoint commons = manifest.bundle.js vendor.chunk.js commons.chunk.js
[../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {vendor} [built]
[../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {vendor} [built]
[./src/moduleA.js] 24 bytes {vendor} [built]
   [0] multi lodash 28 bytes {commons} [built]
[./src/pageA.js] 91 bytes {pageA} [built]
[./src/pageB.js] 92 bytes {pageB} [built]
[./src/subPageA.js] 45 bytes {vendor} [built]
[./src/subPageB.js] 45 bytes {vendor} [built]
    + 1 hidden module
```

看这里：

```
  commons.chunk.js  430 bytes   commons  [emitted]  commons
manifest.bundle.js   4.93 KiB  manifest  [emitted]  manifest
    pageA.chunk.js   1.05 KiB     pageA  [emitted]  pageA
    pageB.chunk.js   1.05 KiB     pageB  [emitted]  pageB
   vendor.chunk.js    549 KiB    vendor  [emitted]  vendor
```

已经成功打包，并且将第三方包，重复代码都已经切分出来了；具体请看文件代码。