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