const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_rule, use_options_rule } = require('./webpack.rules')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

const SERVER_DOMAIN = `http://localhost:${process.env.SERVER_PORT}`  // <- require('dotenv-flow').config() <- webpack.common
const CLIENT_PORT = process.env.CLIENT_PORT

const o1 = mergeWithRules(use_options_rule)(common, {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            // ... other plugins
                            require.resolve('react-refresh/babel'),
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
const o3 = merge(o2, {
    mode: 'development',
    devtool:"inline-source-map",
    devServer: {
        host: '0.0.0.0', // allow devices in local area network to discover
        port: CLIENT_PORT,
        proxy: {
            '/socket.io': {
                target: SERVER_DOMAIN,
                ws: true
            },
            '/api': {
                target: SERVER_DOMAIN,
            },
        },
        stats:'minimal'
    },
    plugins: [
        new CleanTerminalPlugin({
            message: `client running on http://localhost:${CLIENT_PORT}`,
            beforeCompile: true
        }),
        new ReactRefreshWebpackPlugin(),
    ]
})

module.exports = o3