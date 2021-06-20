const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_rule } = require('./webpack.rules')

const serverDomain = `http://localhost:${process.env.SERVER_PORT}`  // <- require('dotenv-flow').config() <- webpack.common

const o1 = mergeWithRules(use_rule)(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }]
            }
        ],
    },
})
const o2 = merge(o1, {
    mode: 'development',
    devServer: {
        port: process.env.CLIENT_PORT,
        proxy: {
            '/socket.io': {
                target: serverDomain,
                ws: true
            },
            '/api': {
                target: serverDomain,
            },
        },
        // stats: {
        //     preset: 'none',
        //     errors: true,
        //     warnings: true
        // },
    },
})

module.exports = o2