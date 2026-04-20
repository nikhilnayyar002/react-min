import { mergeWithRules, merge } from 'webpack-merge';
import { mergeLoaderOptionRule, prependLoaderRule } from './webpack.rules.ts';
import commonConfig from './webpack.common.ts';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { babelTestFilesRegex, config } from './my-config.js';
import { CleanTerminalPlugin, EventHooksPlugin, getClientIPAddresses } from './helper.ts';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const o1 = mergeWithRules(mergeLoaderOptionRule)(commonConfig('development'), {
  module: {
    rules: [
      {
        test: babelTestFilesRegex,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [config.hotModuleReload && import.meta.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
});
const o2 = mergeWithRules(prependLoaderRule)(o1, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }],
      },
    ],
  },
});

const proxyServerOrigin = process.env['SERVER_PROXY_URL'] ? process.env['SERVER_PROXY_URL'] : 'http://localhost:5000';

const o3: Configuration & DevServerConfiguration = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  devtool: config.enableSourceMapsInDevelopment ? 'eval-source-map' : false,
  devServer: {
    host: '0.0.0.0', // https://stackoverflow.com/questions/20778771/what-is-the-difference-between-0-0-0-0-127-0-0-1-and-localhost
    hot: config.hotModuleReload,
    port: config.clientPort,
    proxy: [
      {
        context: ['/socket.io'],
        target: proxyServerOrigin,
        ws: true,
      },
      {
        context: ['/api'],
        target: proxyServerOrigin,
      },
    ],
    server: config.enableHTTPSInDevelopment ? 'https' : 'http',
    compress: false,
    devMiddleware: {
      stats: {
        all: false,
        errors: true,
        warnings: true,
      },
    },
    client: {
      logging: "info", // log updates in browser console
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true, // serve index.html in case of 404 response
  },
  infrastructureLogging: {
    level: 'warn',
  },
  plugins: [
    new EventHooksPlugin({
      environment: () => console.log('@Starting...'),
      compilation: () => console.log('@Compiling...'),
      done: () => console.log('@done!'),
    }),
    new CleanTerminalPlugin(
      `${['Client is available at:', ...getClientIPAddresses(config.clientPort, config.enableHTTPSInDevelopment)].join('\n')}`,
    ),
    config.hotModuleReload && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    chunkIds: 'named',
    // splitChunks: { // https://webpack.js.org/guides/code-splitting/#splitchunksplugin
    //   chunks: 'all',
    // },
  },
};

export default merge(o2, o3);
