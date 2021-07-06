require("./dotenv")

const { mergeWithRules, merge } = require('webpack-merge')
const common = require('./webpack.common')
const { use_rule, use_options_rule } = require('./webpack.rules')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const chalk = require('chalk');
const nets = require('os').networkInterfaces();

const SERVER_DOMAIN = process.env.SERVER_DOMAIN
const CLIENT_PORT = process.env.CLIENT_PORT
const CLIENT_IP_ADDRESSES = (function () {
    const temp = []
    for (const name of Object.keys(nets))
        for (const net of nets[name])
            if (net.family === 'IPv4')
                temp.push(`http://${net.internal ? "localhost" : net.address}:${CLIENT_PORT}`)
    return temp
})();
const PROXY = {
    '/socket.io': {
        target: SERVER_DOMAIN,
        ws: true
    },
    '/api': {
        target: SERVER_DOMAIN,
    },
}
const GENERATE_SOURCE_MAP = false
const WEBPACK_LOGS_TYPE = 'minimal'

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
    output: {
        filename: 'main.js',
        pathinfo: false, // optimization
    },
    devtool: GENERATE_SOURCE_MAP ? "inline-source-map" : false,
    devServer: {
        host: '0.0.0.0',
        port: CLIENT_PORT,
        proxy: PROXY,
        stats: WEBPACK_LOGS_TYPE
    },
    plugins: [
        new CleanTerminalPlugin({
            message: chalk.green(`${CLIENT_IP_ADDRESSES.join("\n")}`),
            beforeCompile: true
        }),
        new ReactRefreshWebpackPlugin(),
    ]
})

module.exports = o3