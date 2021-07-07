require('dotenv-flow').config() // load .env files

const path = require('path')
const webpack = require("webpack")
const { webpack: wConfig, environmentVariablesInApp } = require('./config')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

/********************************************************************* */

module.exports = {
    entry: path.resolve(__dirname, wConfig.dir.source, "index.js"),
    experiments: {
        outputModule: wConfig.outputESModule,
    },
    output: {
        path: path.resolve(__dirname, wConfig.dir.output),
        publicPath: '/',
        clean: true,
        module: wConfig.outputESModule,
        pathinfo: false, // optimization
    },
    resolve: {
        alias: wConfig.alias
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, wConfig.dir.source),
                use: [{
                    loader: 'babel-loader',
                    options: wConfig.getBabelLoaderDefaultOptions("production")
                }]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: wConfig.inlineAssetMaxSize * 1024 // bytes
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'css-loader' }]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, wConfig.dir.public, "index.html"),
            filename: path.resolve(__dirname, wConfig.dir.output, "index.html"),
            favicon: path.resolve(__dirname, wConfig.dir.public, "favicon.ico"),
            inject: 'body'
        }),
        // new webpack.EnvironmentPlugin(['APP_ID']),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            include: new RegExp(wConfig.dir.source),
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
        new ESLintPlugin({
            exclude: path.resolve(__dirname, "node_modules"),
            files: path.resolve(__dirname, wConfig.dir.source),
        }),
        new webpack.EnvironmentPlugin(environmentVariablesInApp),
    ]
}