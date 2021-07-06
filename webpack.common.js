require("./dotenv")

const path = require('path')
// const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const jsconfig = require('./jsconfig.json')

const OUTPUT_DIR = "dist"
const SOURCE_DIR = "src"
const PUBLIC_DIR = "public"
const ASSET_INLINE_CONDITION_MAX_SIZE = 6 // in KB

let resoleAliasObj = {};
(function () {
    let paths = jsconfig?.compilerOptions?.paths ?? {}
    for (let p in paths) {
        let a = p.substring(0, p.length - 2)
        if (paths[p].length) {
            let b = paths[p][0]
            let c = b.substring(0, b.length - 1)
            resoleAliasObj[a] = path.resolve(__dirname, c)
        }
    }
})();

module.exports = {
    entry: path.resolve(__dirname, SOURCE_DIR, "index.js"),
    output: {
        path: path.resolve(__dirname, OUTPUT_DIR),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        alias: resoleAliasObj
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, SOURCE_DIR),
                use: [{ loader: 'babel-loader' }]
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
                        maxSize: ASSET_INLINE_CONDITION_MAX_SIZE * 1024 // bytes
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
            template: path.resolve(__dirname, PUBLIC_DIR, "index.html"),
            filename: path.resolve(__dirname, OUTPUT_DIR, "index.html"),
            favicon: path.resolve(__dirname, PUBLIC_DIR, "favicon.ico"),
            inject: 'body'
        }),
        // new webpack.EnvironmentPlugin(['APP_ID']),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            include: new RegExp(SOURCE_DIR),
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
            files: path.resolve(__dirname, SOURCE_DIR),
        })
    ]
}