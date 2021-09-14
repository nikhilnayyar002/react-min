const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const wmConfig = require('./wm-config')
const CircularDependencyPlugin = require("circular-dependency-plugin")


/********************************************************************* */

module.exports = {
    entry: path.resolve(__dirname, wmConfig.sourceDir, wmConfig.webpack.entryFilename),
    experiments: {
        outputModule: wmConfig.webpack.outputESModule, // https://webpack.js.org/configuration/output/#outputmodule
    },
    output: {
        path: path.resolve(__dirname, wmConfig.outputDir),
        publicPath: '/',
        clean: true, // clean the output dir before generating new output
        module: wmConfig.webpack.outputESModule, // https://webpack.js.org/configuration/output/#outputmodule
        pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
    },
    resolve: wmConfig.webpack.resolve,
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, wmConfig.sourceDir),
                use: [{
                    loader: 'babel-loader',
                    options: wmConfig.babel.getBabelLoaderDefaultOptions()
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
                        maxSize: wmConfig.webpack.inlineAssetMaxSize
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'css-loader' }]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, wmConfig.publicDir, wmConfig.publicDirHtmlFileName),
            filename: path.resolve(__dirname, wmConfig.outputDir, wmConfig.outputDirHtmlFileName),
            favicon: path.resolve(__dirname, wmConfig.publicDir, wmConfig.outputDirFavicomFileName),
            inject: 'body' // inject bundle's inside body tag at the end
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            include: new RegExp(wmConfig.sourceDir),
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
            files: path.resolve(__dirname, wmConfig.sourceDir),
            extensions: wmConfig.webpack.resolve.extensions
        }),
        new webpack.EnvironmentPlugin(wmConfig.webpack.environmentVariablesInApp),
    ]
}