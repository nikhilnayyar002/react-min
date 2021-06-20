require('dotenv-flow').config()

const path = require('path')
// const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const jsconfig = require('./jsconfig.json')

let resoleAliasObj = {};
(function() {
    let paths = jsconfig?.compilerOptions?.paths ?? {}
    for (let p in paths) {
        let a = p.substring(0, p.length - 2)
        if(paths[p].length) {
            let b = paths[p][0]
            let c = b.substring(0, b.length - 1)
            resoleAliasObj[a]= path.resolve(__dirname, c)
        }
    }
})();

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true,
        assetModuleFilename: 'assets/[name].[contenthash].[ext]'
    },
    resolve: {
        alias:resoleAliasObj
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
                test: /\.(png|jpe?g|gif|eot|woff|woff2|ttf)$/i,
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "./index.html",
            // favicon: './src/favicon.ico',
            inject: 'body'
        }),
        // new webpack.EnvironmentPlugin(['APP_ID']),
        new ESLintPlugin(),
        new CleanTerminalPlugin()
    ]
}