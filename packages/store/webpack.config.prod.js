const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');



module.exports = {
  entry: './src/store',
  cache: false,
  mode: 'production',



  optimization: {
    minimize: true
  },



  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: "[id].[chunkhash].js"
  },



  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ]
  },



  plugins: [
    new ModuleFederationPlugin({
      name: 'store_app',
      library: { type: 'var', name: 'store_app' },
      filename: 'remoteEntry.js',
      remotes: {
      },
      exposes: {
        store: './src/store'
      },
      shared: []
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   chunks: ['main'],
    // }),
  ]
};