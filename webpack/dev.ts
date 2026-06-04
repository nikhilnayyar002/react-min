import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import devConfig from "./webpack.dev.ts";

// https://webpack.js.org/api/webpack-dev-server/

const compiler = webpack(devConfig);
const devServerOptions = { ...devConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);
const runServer = async () => {
  await server.start();
};
runServer();
