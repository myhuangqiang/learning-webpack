### 比如webpack需要提取代码单独打包一个文件，以下2个插件能完成

```
1.extract-loader

2.ExtractTextWebpackPlugin
```

### 安装

```
npm install extract-text-webpack-plugin webpack --save-dev
```

新建一个webpack.config.js进行配置

### 引入包

```
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

```

### 使用插件局部配置
```js
plugins: [
    new ExtractTextWebpackPlugin({
        filename: '[name].min.css',
        allChunks: false,
    })
]
```

### 详细代码配置

```js
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false
                            }
                        }
                    ],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: true,
        })
    ]
}
```


### 成功打包
```
➜  webpack-extract-css git:(master) ✗ webpack
Hash: a4727dc1ec26028a64a3
Version: webpack 4.5.0
Time: 558ms
Built at: 2018-6-25 10:26:04
        Asset       Size  Chunks             Chunk Names
  a.bundle.js   1.13 KiB       a  [emitted]  a
app.bundle.js   7.72 KiB     app  [emitted]  app
  app.min.css  470 bytes     app  [emitted]  app
Entrypoint app = app.bundle.js app.min.css
[./src/app.js] 123 bytes {app} [built]
[./src/css/base.css] 41 bytes {app} [built]
    + 2 hidden modules
```