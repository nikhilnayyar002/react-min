import type { Configuration } from 'webpack';
import { babelTestFilesRegex, config, specialEnvVarKeys } from './my-config.js';
import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { InterpolateHtmlPlugin } from './helper.ts';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';

const __dirname = process.cwd();

const commonConfig: (env: 'development' | 'production') => Configuration = env => ({
  entry: path.resolve(__dirname, config.entryFile),
  experiments: {
    outputModule: config.outputESModuleSyntax,
  },
  resolve: {
    tsconfig: path.resolve(__dirname, 'tsconfig.json'), // use tsconfig aliases  for resolving imports
    extensions: config.sourceExtensions, // enables users to leave off the extension when importing
    // modules: ["src", "node_modules"],
    symlinks: false, // The dependency must be able to be resolved from the linked location of the symlinked file ie this repos node_modules
  },
  // cache: false, // set cache to false when live changes in linked libraries need to be reflected instantly in this running repo
  output: {
    path: path.resolve(__dirname, config.outputDir),
    clean: false, // clean the output dir before generating new output, we are manually cleaning in custom build script
    module: config.outputESModuleSyntax,
    pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
  },
  module: {
    rules: [
      // typescript/javascript
      {
        test: babelTestFilesRegex,
        exclude: /node_modules/,
        include: path.resolve(__dirname, config.sourceDir),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: config.browserslist[env],
                    modules: false,
                    bugfixes: true, // This option will be always enabled and thus removed in Babel 8.
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      // resources like fonts, images
      {
        test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif|webp|avif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          // dataUrlCondition: () => false will disable inlining
          dataUrlCondition: {
            maxSize: config.inlineAssetMaxSize,
          },
        },
      },
      // css
      {
        test: /\.css$/,
        use: [{ loader: 'css-loader' }],
      },
      // txt
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, config.publicDir, config.htmlFileTemplate),
      filename: path.resolve(__dirname, config.htmlFileOutput),
      inject: 'body', // inject bundle's inside body tag at the end
      scriptLoading: 'module',
    }),
    new InterpolateHtmlPlugin(specialEnvVarKeys),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: new RegExp(config.sourceDir),
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new ESLintPlugin({
      exclude: path.resolve(__dirname, 'node_modules'),
      files: path.resolve(__dirname, config.sourceDir),
      extensions: config.sourceExtensions.map(v => v.slice(1)),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'readonly',
        configOverwrite: {
          // only watch these paths for changes and ignore tsconfig.json include
          include: [config.sourceDir, 'declarations.d.ts'],
        },
      },
    }),
    new webpack.EnvironmentPlugin(specialEnvVarKeys),
  ],
});
export default commonConfig;
