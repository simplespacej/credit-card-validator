const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config.js');

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    static: {
      directory: config.output.path,
    },
    port: 9000,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
  compiler
);

server.start();
console.log('E2E test server is running on http://localhost:9000');
