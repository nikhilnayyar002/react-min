require("dotenv-flow").config() // load .env files
const tsConfig = require("./tsconfig.json")
const { getClientIPAddresses, getWebpackAliasFromTsConfig } = require("./wm-helper")

/************************************************************************************************* */

const proxyServerOrigin1 = "http://localhost:5000"
const clientPort = 3000
const devHttpsMode = false
const hotModuleReload = true
const outputESModule = true
const typescript = false
const entryFilenameJs = "index.js"
const entryFilenameTs = "index.tsx"
/**
 * if no extenstion is present in module path then following extentions will be tried to resolve the module as a file.
 * https://webpack.js.org/concepts/module-resolution/#module-paths
 * https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx
 */
const extensions = ['.tsx', '.ts', "jsx", '.js']

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
    typescript,
    outputDir: "build",
    sourceDir: "src",
    publicDir: "public",
    assetsDirInsideOutputDir: "assets", // Eg: if value is "assets" & outputDir is "build" then folder will be "build/assets"
    publicDirHtmlFileName: "index.html",
    outputDirHtmlFileName: "index.html",
    outputDirFavicomFileName: "favicon.ico",
    entryFilenameJs,
    entryFilenameTs,
    webpack: {
        entryFilename: typescript ? entryFilenameTs : entryFilenameJs,
        inlineAssetMaxSize: 6 * 1024, // in Bytes
        resolve: {
            alias: getWebpackAliasFromTsConfig(tsConfig),
            extensions,
        },
        outputESModule, // ouput ECMAScript module syntax whenever possible.
        generateIntialVendorChunk: true,
        generateAsyncVendorChunk: true,
        asyncVendorChunkMinSize: 1024, // https://github.com/webpack/webpack/issues/13768
        dev: {
            clientIPAddresses: getClientIPAddresses(clientPort, devHttpsMode),
            sourceMaps: true,
            styleSourceMaps: false, // sourcemaps for css, sass etc
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
        testFilesRegex: new RegExp(`\\.(${extensions.map(v => v.slice(1)).join("|")})$`),
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
                typescript && "@babel/preset-typescript"
            ].filter(Boolean)
        })
    }
}

module.exports = wmConfig