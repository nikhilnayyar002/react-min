const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_options_rule, use_rule } = require('./webpack.rules')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const CSS_BUNDLES_FILENAME_FORMAT = '[name].[contenthash].css'
const CSS_BUNDLES_CHUNK_FILENAME_FORMAT = '[id].[contenthash].[ext]'
const ASSETS_DIR = "assets"
const JS_BUNDLES_FILENAME_FORMAT = '[name].[contenthash].js'
const JS_BUNDLES_CHUNK_FILENAME_FORMAT = '[id].[contenthash].js'
const ASSET_BUNDLES_FILENAME_FORMAT = '[name].[contenthash].[ext]'

// const o1 = mergeWithRules(use_options_rule)(common, {
//     module: {
//         rules: [
//             {
//                 test: /\.html$/,
//                 use: [{ loader: 'html-loader', options: { minimize: true } }]
//             }
//         ],
//     },
// })
const o2 = mergeWithRules(use_rule)(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }]
            }
        ],
    },
})
const o3 = merge(o2, {
    output: {
        filename: JS_BUNDLES_FILENAME_FORMAT,
        chunkFilename: JS_BUNDLES_CHUNK_FILENAME_FORMAT,
        assetModuleFilename: `${ASSETS_DIR}/${ASSET_BUNDLES_FILENAME_FORMAT}`,
    },
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: CSS_BUNDLES_FILENAME_FORMAT,
            chunkFilename: CSS_BUNDLES_CHUNK_FILENAME_FORMAT
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
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                },
                // styles: {
                //     name: 'styles',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true,
                // },
            },
        },
    },
})

module.exports = o3