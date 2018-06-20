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
                // 使用的规则
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