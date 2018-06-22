### webpack处理css的loader

- style-loader
    - style-loader
    - style-loader/url
    - style-loader/useable
- css-loader

### webpack处理css只需要配置2步：

##### 第一步：安装style-loader css-loader file-loader包：

```
npm install style-loader css-loader file-loader --save-dev
```

### 第二步：在webpack.config.js里面进行配置：

```
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: 'css-loader'
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

将css-loader打包好的css代码以<style>标签的形式插入到html文件中。

![css-loader](./css-loader.png)

### 使用style-loader/url配置

将css-loader打包好的css代码以<link>文件的形式插入到html文件中。

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader/url"
                }, {
                    loader: 'file-loader'
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```


![css-loader-url](./css-loader-url.png)

### 使用style-loader/useable配置
将css-loader打包好的css代码以<link>文件的形式插入到html文件中。
可以使用use或unuse使用css代码

例如：

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader/useable"
                }, {
                    loader: 'css-loader'
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

### 在app.js写入代码测试：

```
import base from './css/base.css'
import common from './css/common.css'

// 使用base样式
base.use();

// 不使用common样式
common.unuse();
```

### Style-Loader options配置

##### options（参数）
- insertAt(插入位置)
- insertInto(插入到dom哪个html标签上)
- singleton(是否只使用一个style标签)
- transform(异步获取css代码可以进行转化，在浏览器环境下，插入到页面前)

示例：
```
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader",
                    options: {
                        insertInto: '#app',
                        singleton: true,
                        transform: './css.transform.js'
                    }
                }, {
                    loader: 'css-loader'
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

### insertInto需要使用一个id为app的div即可生效

```html
<div id="app"></div>
```

### singleton: true

```
只使用一个style标签
```

### transform需要新建一个文件来进行处理：

```js
//  ./css.transform.js，
module.exports = function (css) {
    console.log(css);

    // return css;

    if (window.innerWidth >= 768) {
        return css.replace('#f00', 'blue')
    } else {

        return css.replace('#f00', '#fc1')
    }
}
```

![css-loader-options](./css-loader-option.png)

### 总结：

```
1.使用style-loader, css-loader配置webpack进行css打包
2.style-loader是打包后使用style插入到文档中
3.style-loader/url是打包后使用link链接css文件到文档中
4.style-loader/useable是打包后，开发者可用按需使用use()或不适应unuse()
5.style-loader 有 options（参数）
    - insertAt(插入位置)
    - insertInto(插入到dom哪个html标签上)
    - singleton(是否只使用一个style标签)
    - transform(异步获取css代码可以进行转化，在浏览器环境下，插入到页面前)
```