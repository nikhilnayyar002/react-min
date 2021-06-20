require('dotenv-flow').config()
// const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

module.exports = {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: [{ loader: 'html-loader' }]
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.svg/i,
                type: 'asset/inline'
            },
            {
                test: /\.css$/,
                use: [{ loader: 'css-loader' }]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
            filename: "index.html",
            // favicon: `${__dirname}/src/favicon.ico`,
            inject: 'body'
        }),
        // new webpack.EnvironmentPlugin(['APP_ID']),
        new ESLintPlugin(),
        new CleanTerminalPlugin()
    ]
}