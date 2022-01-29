const path = require("path");
const { use_options_rule, use_rule } = require("./webpack.rules");
const { mergeWithRules, merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const wmConfig = require("./wm-config");
const webpackCommonConfig = require("./webpack.common");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { CleanTerminalPlugin, EventHooksPlugin } = require("./wm-helper");

/********************************************************************* */

const o1 = mergeWithRules(use_options_rule)(webpackCommonConfig("development"), {
  module: {
    rules: [
      {
        test: wmConfig.babel.testFilesRegex,
        use: [
          {
            loader: "babel-loader",
            options: {
              ...wmConfig.babel.getBabelLoaderDefaultOptions("development"),
              plugins: [wmConfig.webpack.dev.hmr && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: wmConfig.webpack.dev.styleSourceMaps,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: wmConfig.webpack.dev.styleSourceMaps,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: wmConfig.webpack.dev.styleSourceMaps,
            },
          },
        ],
      },
    ],
  },
});
const o2 = mergeWithRules(use_rule)(o1, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{ loader: "style-loader" }],
      },
    ],
  },
});

/********************************************************************* */

const o3 = merge(o2, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },
  devtool: wmConfig.webpack.dev.sourceMaps ? "eval-source-map" : false,
  devServer: wmConfig.webpack.dev.devServer,
  infrastructureLogging: {
    level: "warn",
  },
  plugins: [
    new EventHooksPlugin({
      environment: () => console.log("@Starting..."),
      compilation: () => console.log("@Compiling..."),
      done: () => console.log("@done!"),
    }),
    new CleanTerminalPlugin({
      message: `${["Client is available at:", ...wmConfig.webpack.dev.clientIPAddresses].join("\n")}`,
      beforeCompile: true,
    }),
    wmConfig.webpack.dev.hmr && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: false,
    runtimeChunk: "single",
    chunkIds: "named",
    splitChunks: {
      // https://stackoverflow.com/questions/66786783/combine-vendor-chunk-into-chunk-created-with-dynamic-import-in-webpack
      chunks() {
        return false;
      },
      cacheGroups: {
        vendorsInitial: wmConfig.webpack.generateIntialVendorChunk
          ? {
              test: /[\\/]node_modules[\\/]/,
              chunks: "initial",
            }
          : false,
        vendorsAsync: wmConfig.webpack.generateAsyncVendorChunk
          ? {
              test: /[\\/]node_modules[\\/]/,
              chunks: "async",
              minSize: wmConfig.webpack.asyncVendorChunkMinSize,
            }
          : false,
      },
    },
  },
});

module.exports = (/** @type {{ [key:String]:String ]}} */ env) =>
  env.speedMeasure ? new SpeedMeasurePlugin().wrap(o3) : o3;
