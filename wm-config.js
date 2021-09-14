require("dotenv-flow").config() // load .env files
const tsConfig = require("./tsconfig.json")
const { getClientIPAddresses, getWebpackAliasFromTsConfig } = require("./wm-helper")

/************************************************************************************************* */

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

/************************************************************************************************* */

const wmConfig = {
    outputDir: "build",
    sourceDir: "src",
    publicDir: "public",
    assetsDirInsideOutputDir: "assets",
    publicDirHtmlFileName: "index.html",
    outputDirHtmlFileName: "index.html",
    outputDirFavicomFileName: "favicon.ico",
    webpack: {
        entryFilename: "index.tsx",
        inlineAssetMaxSize: 6 * 1024, // in Bytes
        resolve: {
            alias: getWebpackAliasFromTsConfig(tsConfig),
            extensions: ['.tsx', '.ts', "jsx", '.js'],
        },
        outputESModule, // ouput ECMAScript module syntax whenever possible.
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
                client: {
                    overlay: {
                        errors: true,
                        warnings: false
                    },
                },
            }
        },
        prod: {
            combineStyleSheets: false,
        },
        environmentVariablesInApp: [], // strings, add env variables to be available inside web application as process.env.[VAR]
    },
    babel: {
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
                ],
                "@babel/preset-typescript"
            ]
        })
    }
}

module.exports = wmConfig