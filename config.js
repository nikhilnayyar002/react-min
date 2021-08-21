const jsconfig = require('./jsconfig.json')
const nets = require('os').networkInterfaces();
const path = require('path')

/************************ */

function genAlias() {
    let webpackAlias = {};
    let paths = jsconfig?.compilerOptions?.paths ?? {}
    for (let p in paths) {
        let a = p.substring(0, p.length - 2)
        if (paths[p].length) {
            let b = paths[p][0]
            let c = b.substring(0, b.length - 1)
            webpackAlias[a] = path.resolve(__dirname, c)
        }
    }
    return webpackAlias
}

function getClientIPAddresses(clientPort, httpsMode = false) {
    const temp = []
    for (const name of Object.keys(nets))
        for (const net of nets[name])
            if (net.family === 'IPv4')
                temp.push(`${httpsMode ? "https" : "http"}://${net.internal ? "localhost" : net.address}:${clientPort}`)
    return temp
}

/************************ */

const proxyServerOrigin1 = "http://localhost:5000"
const clientPort = 3000
const devHttpsMode = false
const hotModuleReload = true
const outputESModule = true

const browserslist = {
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
    ],
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ]
}

/************************ */

module.exports = {
    webpack: {
        dir: {
            output: "dist",
            source: "src",
            public: "public",
            assets: "assets"
        },
        inlineAssetMaxSize: 6, // in KB
        alias: genAlias(),
        outputESModule, // ouput ECMAScript module syntax whenever possible.
        getBabelLoaderDefaultOptions: (mode = "production") => ({
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
                [
                    "@babel/preset-react",
                    {
                        "runtime": "automatic" // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
                    }
                ],
                [
                    "@babel/preset-env",
                    {
                        targets: outputESModule ? { esmodules: true } : browserslist[mode],
                        modules: outputESModule ? false : "auto",
                        bugfixes: true
                    }
                ]
            ]
        }),
        generateIntialVendorChunk: true,
        generateAsyncVendorChunk: true,
        asyncVendorChunkMinSize: 1024, // https://github.com/webpack/webpack/issues/13768
        dev: {
            clientIPAddresses: getClientIPAddresses(clientPort, devHttpsMode),
            sourceMaps: true,
            hmr: hotModuleReload,
            devServer: {
                host: '0.0.0.0',
                hot: hotModuleReload,
                port: clientPort,
                proxy: {
                    '/socket.io': { target: proxyServerOrigin1, ws: true },
                    '/api': { target: proxyServerOrigin1 },
                },
                https: devHttpsMode,
                compress: false,
                devMiddleware: {
                    stats: {
                        all: false,
                        errors: true,
                        warnings: true
                    },
                },
            }
        },
        prod: {
            combineStyleSheets: false,
        }
    },
    environmentVariablesInApp: [], // strings
}