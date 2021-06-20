const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_options_rule, use_rule } = require('./webpack.rules')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

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
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
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