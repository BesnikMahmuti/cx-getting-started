const webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),    
    path = require('path');

module.exports = {
    resolve: {
        alias: {
            // cx: path.join(__dirname, 'node_modules/cx-core/src/'),
            app: path.join(__dirname, 'app')
        }
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }, 
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                // Add any ES6 based libraries here:
                include: /(app|cx)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    cacheIdentifier: "v1",
                    presets: [
                        ["cx-env", {
                            targets: {
                                chrome: 50,
                                ie: 11,
                                ff: 30,
                                edge: 12,
                                safari: 9
                            },
                            modules: false,
                            loose: true,
                            useBuiltIns: true,
                            cx: {
                                imports: {
                                    useSrc: true
                                }
                            }
                        }]
                    ],
                    "plugins": []
                }
            }]
    },
    entry: {
        app: path.join(__dirname, 'app/index.js')
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html')
        })        
    ],
    devtool: 'eval',
    devServer: {
        hot: true,
        port: 8086,
        noInfo: false,
        inline: true,
        historyApiFallback: true
    }
};