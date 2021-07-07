
const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_rule } = require('./webpack.rules')
const { webpack: wConfig } = require('./config')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin")

/********************************************************************* */

const o1 = mergeWithRules(use_rule)(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }]
            }
        ],
    },
})

/********************************************************************* */

const o2 = merge(o1, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename:'[id].[contenthash].js',
        assetModuleFilename: `${wConfig.dir.assets}/[name].[contenthash].[ext]`,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].[ext]'
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin()
        ],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendorsInitial: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                },
                vendorsAsync: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                },
                styles: wConfig.prod.combineStyleSheets ? {
                    name: "styles",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                } : false
            },
        }
    },
})

module.exports = o2