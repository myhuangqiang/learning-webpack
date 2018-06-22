var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
    },
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
                        loader: 'css-loader',
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    }

}