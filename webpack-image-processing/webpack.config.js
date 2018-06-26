var path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-sprites')({
                                    spritePath: 'dist/assets/imgs/sprites',
                                    retina: true,
                                }),
                                require('postcss-cssnext')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
                exclude: '/node_modules'
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].mini.[ext]',
                            publicPath: '',
                            outputPath: '/',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: '',
                    //         outputPath: '/',
                    //         useRelativePath: true
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].mini.[ext]',
                            publicPath: '',
                            outputPath: '/',
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80,
                            }
                        }
                    }
                ]
            }
        ]
    }
}