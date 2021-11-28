require("dotenv-flow").config() // load .env files
const tsConfig = require("./tsconfig.json")
const { getClientIPAddresses, getWebpackAliasFromTsConfig } = require("./wm-helper")

// *************************************************************************************************
// dont change the values of variables. These are updated by feature commands

const typescript = false
const sass = false

// *************************************************************************************************
const proxyServerOrigin1 = "http://localhost:5000"
const clientPort = 3000
const devHttpsMode = false
const hotModuleReload = true
const outputESModule = true
const entryFilenameJs = "index.js"
const entryFilenameTs = "index.tsx"

// Public path for generated bundles & assets. Eg:
// 1. "" = "main.3r343.js"
// 1. "/" = "/main.3r343.js"
// 2. "/myPage" or "/myPage/" = "/myPage/main.3r343.js"
// 3. "http://cdn.com" or "http://cdn.com/" = "http://cdn.com/main.3r343.js"
const publicPath = "/"

// if no extenstion is present in module path then following extentions will be tried to resolve the module as a file.
// https://webpack.js.org/concepts/module-resolution/#module-paths
// https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx
const extensions = ['.tsx', '.ts', "jsx", '.js']

// https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers
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

// *************************************************************************************************
// add special env variables 
const specialEnvVariables = {
    'PUBLIC_URL': /\/$/.test(publicPath) ? publicPath.replace(/.$/, "") : publicPath
}
for (let prop in specialEnvVariables)
    process.env[prop] = specialEnvVariables[prop]

// *************************************************************************************************

const wmConfig = {
    typescript,
    outputDir: "build",
    sourceDir: "src",
    publicDir: "public",
    assetsDirInsideOutputDir: "assets", // Eg: if value is "assets" & outputDir is "build" then folder will be "build/assets"
    publicDirHtmlFileName: "index.html", // this will also be used as output dir filename
    entryFilenameJs,
    entryFilenameTs,
    specialEnvVariables,
    webpack: {
        publicPath,
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
                historyApiFallback: true
            }
        },
        prod: {
            combineStyleSheets: false,
        },
        // strings, add env variables to be available inside web application as process.env.[VAR]
        environmentVariablesInApp: [

        ].concat(
            Object.keys(process.env).filter(v => v.startsWith("REACT_MIN_")),
            Object.keys(specialEnvVariables)
        ),
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