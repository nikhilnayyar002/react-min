const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const wmConfig = require("./wm-config");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { InterpolateHtmlPlugin } = require("./wm-helper");
const ESLintPlugin = require("eslint-webpack-plugin");

/********************************************************************* */

module.exports = (/** @type {"development"|"production"} */ env) => ({
  // cache: false, // set cache to false when live changes in linked libraries need to be reflected instantly in this running repo
  entry: path.resolve(__dirname, wmConfig.sourceDir, wmConfig.webpack.entryFilename),
  experiments: {
    outputModule: wmConfig.webpack.outputESModule, // https://webpack.js.org/configuration/output/#outputmodule
  },
  output: {
    path: path.resolve(__dirname, wmConfig.outputDir),
    publicPath: wmConfig.webpack.publicPath,
    // clean the output dir before generating new output
    // we are manually cleaning in custom build script
    clean: false,
    module: wmConfig.webpack.outputESModule, // https://webpack.js.org/configuration/output/#outputmodule
    pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
  },
  resolve: wmConfig.webpack.resolve,
  module: {
    rules: [
      {
        test: wmConfig.babel.testFilesRegex,
        exclude: /node_modules/,
        include: path.resolve(__dirname, wmConfig.sourceDir),
        use: [
          {
            loader: "babel-loader",
            options: wmConfig.babel.getBabelLoaderDefaultOptions(),
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: wmConfig.webpack.inlineAssetMaxSize,
          },
        },
      },
      /** svg
       *  https://react-svgr.com/docs/webpack/#handle-svg-in-css-sass-or-less
       *  https://github.com/gregberge/svgr/issues/551#issuecomment-883073902
       *  https://webpack.js.org/configuration/module/#ruleoneof
       *  https://github.com/gregberge/svgr/pull/650
       */
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: /react/, // *.svg?react
            use: ["@svgr/webpack"],
          },
          {
            type: "asset",
            parser: {
              dataUrlCondition: wmConfig.webpack.inlineSvgWhenAssetMaxSizeReached
                ? {
                    maxSize: wmConfig.webpack.inlineAssetMaxSize,
                  }
                : () => false,
            },
          },
        ],
      },
      /** */
      {
        test: /\.css$/,
        use: [{ loader: "css-loader" }],
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, wmConfig.publicDir, wmConfig.publicDirHtmlFileName),
      filename: path.resolve(__dirname, wmConfig.outputDir, wmConfig.publicDirHtmlFileName),
      inject: "body", // inject bundle's inside body tag at the end
      scriptLoading: wmConfig.webpack.outputESModule ? "module" : "defer",
    }),
    new InterpolateHtmlPlugin(wmConfig.specialEnvVariables),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      include: new RegExp(wmConfig.sourceDir),
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
    new ESLintPlugin({
      exclude: path.resolve(__dirname, "node_modules"),
      files: path.resolve(__dirname, wmConfig.sourceDir),
      extensions: wmConfig.webpack.resolve.extensions,
    }),
    wmConfig.typescript &&
      (env === "production"
        ? wmConfig.typescriptErrorCheckInProd
        : env === "development" && wmConfig.typescriptErrorCheckInDev) &&
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
        },
      }),
    wmConfig.webpack.environmentVariablesInApp.length &&
      new webpack.EnvironmentPlugin(wmConfig.webpack.environmentVariablesInApp),
  ].filter(Boolean),
});
