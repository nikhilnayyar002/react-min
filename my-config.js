// @ts-check

import dotenvFlow from 'dotenv-flow'
dotenvFlow.config() // load .env files

const config = {
  outputDir: 'build', // where webpack will output code
  sourceDir: 'src',
  entryFile: 'src/index.ts', // source file to start bundling from
  publicDir: 'public', // folder containing files you simply want to be copied inside build folder
  htmlFileTemplate: 'index.html', // template to use for html
  htmlFileOutput: 'build/index.html', // output path for html after build
  publicPathInProd: process.env['PUBLIC_PATH_PROD'], // check .env file for details
  outputESModuleSyntax: true, // ouput ECMAScript module syntax whenever possible by webpack. webpack default to IIFEs and its own system
  /**
   * typescript is enabled in IDE's and reports type errors when a file is opened. but one can also enable build tools like webpack to report typescript errors.
   * Type checking by build tools slows performance
   */
  typescriptErrorCheckInDev: false,
  typescriptErrorCheckInProd: true,
  inlineAssetMaxSize: 6 * 1024, // in Bytes. if (asset size >= this) then asset will be inlined in code
  enableHTTPSInDevelopment: false,
  enableSourceMapsInDevelopment: true, // sourcemaps for typescript
  hotModuleReload: true,
  clientPort: 3000, // localhost port in development
  sourceExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  // https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers
  browserslist: {
    production: 'baseline 2017',
    development: 'baseline newly available',
  },
}

const specialEnvVarKeys = Object.keys(process.env).filter(v => v.startsWith('MY_APP_'))
if (process.env['PUBLIC_PATH_PROD'] !== undefined)
  specialEnvVarKeys.push("PUBLIC_PATH_PROD")

const babelTestFilesRegex = new RegExp(`\\.(${config.sourceExtensions.map(v => v.slice(1)).join('|')})$`)

export { config, specialEnvVarKeys, babelTestFilesRegex }
