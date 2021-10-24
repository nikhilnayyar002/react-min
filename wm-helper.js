const nets = require('os').networkInterfaces();
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
function escapeStringRegexp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// tsconfig path alias:
//  "compilerOptions": {
//      "baseUrl": ".",
//      "paths": {
//          "@styles/*": [
//              "src/styles/*"
//          ]
//      },
//
// webpack path alias:
//  "@styles": path.resolve(__dirname, 'src/utilities/'),
//
exports.getWebpackAliasFromTsConfig = (tsConfig) => {
    let webpackAlias = {};
    const baseUrl = tsConfig?.compilerOptions?.baseUrl
    if (!baseUrl) throw "tsconfig.json baseUrl missing"
    if (baseUrl !== ".") throw 'tsconfig.json baseUrl must have value "."'
    const paths = tsConfig?.compilerOptions?.paths ?? {}
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

exports.getClientIPAddresses = (clientPort, httpsMode = false) => {
    const temp = []
    for (const name of Object.keys(nets))
        for (const net of nets[name])
            if (net.family === 'IPv4')
                temp.push(`${httpsMode ? "https" : "http"}://${net.internal ? "localhost" : net.address}:${clientPort}`)
    return temp
}


// https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/InterpolateHtmlPlugin.js
// https://github.com/jantimon/html-webpack-plugin/#events
const interpolateHtmlPluginName = "InterpolateHtmlPlugin"
class InterpolateHtmlPlugin {

    constructor(replacements) {
        this.replacements = replacements;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(interpolateHtmlPluginName, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
                interpolateHtmlPluginName,
                (data, cb) => {
                    // Run HTML through a series of user-specified string replacements.
                    Object.keys(this.replacements).forEach(key => {
                        const value = this.replacements[key];
                        data.html = data.html.replace(
                            new RegExp('%' + escapeStringRegexp(key) + '%', 'g'),
                            value
                        );
                    });
                    cb(null, data)
                }
            )
        })
    }
}
exports.InterpolateHtmlPlugin = InterpolateHtmlPlugin