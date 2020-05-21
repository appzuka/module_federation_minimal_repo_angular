const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const ContainerReferencePlugin = require("webpack/lib/container/ContainerReferencePlugin");
const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");

module.exports = {
  entry: './src/store',
  cache: false,

  mode: 'development',
  //devtool: 'source-map',

  optimization: {
    minimize: false
  },
  devServer: {
    port: 3004
  },

  output: {
    publicPath: 'http://localhost:3004/'
  },

  // resolve: {
  //   extensions: ['.jsx', '.js', '.json']
  // },


  module: {
    rules: [
      {
        test: /\.js$/,
        // include,
        // exclude,
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
    // new ContainerPlugin({
    //   name: "store_app",
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     store: './src/store'
    //   },
    //   library: { type: "var", name: "store_app" },
    // }),    
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};