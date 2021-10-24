const { mergeWithRules, merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const { use_rule } = require('./webpack.rules')
const wmConfig = require('./wm-config')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin")

/********************************************************************* */

const o1 = mergeWithRules(use_rule)(webpackCommonConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{ loader: MiniCssExtractPlugin.loader }]
            },
        ],
    },
})

/********************************************************************* */

const o2 = merge(o1, {
    mode: 'production',
    output: {
        filename: `${wmConfig.assetsDirInsideOutputDir}/[name].[contenthash].js`,
        chunkFilename: `${wmConfig.assetsDirInsideOutputDir}/[id].[contenthash].js`,
        assetModuleFilename: `${wmConfig.assetsDirInsideOutputDir}/[name].[contenthash].[ext]`, // https://webpack.js.org/guides/asset-modules/#custom-output-filename
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${wmConfig.assetsDirInsideOutputDir}/[name].[contenthash].css`,
            chunkFilename: `${wmConfig.assetsDirInsideOutputDir}/[id].[contenthash].[ext]`
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
                vendorsInitial: wmConfig.webpack.generateIntialVendorChunk ? {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                } : false,
                vendorsAsync: wmConfig.webpack.generateAsyncVendorChunk ? {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    minSize: wmConfig.webpack.asyncVendorChunkMinSize
                } : false,
                styles: wmConfig.webpack.prod.combineStyleSheets ? {
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