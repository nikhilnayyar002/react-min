const path = require('path')
const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_rule, use_options_rule } = require('./webpack.rules')
const { webpack: wConfig } = require('./config')
const webpack = require("webpack")

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const EventHooksPlugin = require('event-hooks-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

/********************************************************************* */

const o1 = mergeWithRules(use_options_rule)(common, {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        ...wConfig.getBabelLoaderDefaultOptions("development"),
                        plugins: [
                            wConfig.dev.hmr ? require.resolve('react-refresh/babel') : false,
                        ].filter(Boolean),
                    }
                }]
            }
        ],
    },
})
const o2 = mergeWithRules(use_rule)(o1, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }]
            }
        ],
    },
})

/********************************************************************* */

const o3 = merge(o2, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
    },
    devtool: wConfig.dev.sourceMaps ? "inline-source-map" : false,
    devServer: wConfig.dev.devServer,
    plugins: [
        new EventHooksPlugin({
            environment: () => console.log("@Starting..."),
            compilation: () => console.log("@Compiling..."),
            done: () => console.log("@done!"),
        }),
        new CleanTerminalPlugin({
            message: `${["Client is available at:", ...wConfig.dev.clientIPAddresses].join("\n")}`,
            beforeCompile: true
        }),
        ...(
            wConfig.dev.hmr ? [
                new webpack.HotModuleReplacementPlugin(),
                new ReactRefreshWebpackPlugin({
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, wConfig.dir.source)
                })
            ] : []
        ),
    ].filter(Boolean),
    optimization: {
        minimize: false,
        runtimeChunk: 'single',
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendorsInitial: wConfig.generateIntialVendorChunk ? {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                } : false,
                vendorsAsync: wConfig.generateAsyncVendorChunk ? {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    minSize: wConfig.asyncVendorChunkMinSize
                } : false,
            },
        },
    }
})

module.exports = process.env.SPEED_MEASURE === "true" ? new SpeedMeasurePlugin().wrap(o3) : o3