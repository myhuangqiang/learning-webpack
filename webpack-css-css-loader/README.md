### css-loader： options
 - alias 解析的别名
 - importLoader (@import)
 - Minimize 是否压缩
 - modules 是不是开启css模块化（启用css-modules）
    - :local
    - :global
    - compose
    - compose ... from path


### 开启压缩：minimize

新建了2个css文件，分别引入进行压缩

```js
minimize: true
```

详细代码

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader",
                    options: {
                        // insertInto: '#app',
                        singleton: true,
                        transform: './css.transform.js'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

![css-css-loader-minimize](./css-css-loader-minimize.png)

代码已经被压缩到一行，没有空格回车了


#### 模块化:

```js
modules: true
```

详细代码
```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader",
                    options: {
                        // insertInto: '#app',
                        singleton: true,
                        transform: './css.transform.js'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        // 模块化
                        modules: true,
                    }
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

![css-loader-modules](./css-loader-modules.png)

还可以引入别的文件css

比如在common.css里的big-box
```css
.big-box {
    border: 2px solid #000;
}
```

我想在base里面进行使用

```css
.box{
    /* 这样引入也是可以的 */
    composes: big-box from './common.css';
    height: 100px;
    width: 100px;
    background-color: #f00;
}
```

看效果：

![css-loader-modules2](./css-loader-modules2.png)

### 编译打包样式名字规范

```js
localIdentName: '[path][name]_[local]_[hash:base64:5]'
```

详细代码：

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader",
                    options: {
                        // insertInto: '#app',
                        singleton: true,
                        transform: './css.transform.js'
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        // 规范样式名字
                        localIdentName: '[path][name]_[local]_[hash:base64:5]'
                    }
                }
            ],
            exclude: /node_modules/,
        }
    ]
}
```

![css-loader-modules3](css-loader-modules3.png)

