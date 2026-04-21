import { mergeWithRules, merge } from 'webpack-merge';
import commonConfig from './webpack.common.ts';
import type { Configuration } from 'webpack';
import { config } from './my-config.js';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { prependLoaderRule } from './webpack.rules.ts';

// const defaulter = new webpack.WebpackOptionsDefaulter();
// console.log(defaulter.process({mode: "production"}).optimization.minimizer);

const o1 = mergeWithRules(prependLoaderRule)(commonConfig('production'), {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }],
      },
    ],
  },
});

const o2: Configuration = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // chunkFilename: '[name].[id].[contenthash].js',
    assetModuleFilename: '[name].[contenthash].[ext]', // https://webpack.js.org/guides/asset-modules/#custom-output-filename
    publicPath: config.publicPathInProd,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //https://github.com/webpack/terser-webpack-plugin#terseroptions
        extractComments: false,
        terserOptions: {
          // https://github.com/webpack/webpack/blob/main/lib/config/defaults.js#L1907
          compress: {
            passes: 2
          }
        }
      }),
      new CssMinimizerPlugin(),
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    providedExports: true,
    splitChunks: {
      chunks: "all",
      // minSize: 20 * 1024, // (before min+gz)
    },
  },
};

export default merge(o1, o2);
