const { resolve } = require('path');

require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;
const isDevMode = (env && env.toLowerCase() === "development");

const config = {
  mode: "production",

  entry: {
    "xmjcraft": resolve("./src/", "app")
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: "node",

  node: {
    __dirname: false,
    __filename: false
  },

  externals: nodeExternals(),

  devtool: "",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude:  /node_modules/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { 
        from: resolve("./src", "configs"),
        to: 'configs',
        ignore: [
          ".gitkeep"
        ]
      },
      { 
        from: resolve("./src", "statics"),
        to: 'statics',
        ignore: [
          ".gitkeep"
        ]
      }
    ]),

  ],

  output: {
    path: resolve('./dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  stats: {
    // Ignore warnings due to yarg's dynamic module loading
    warningsFilter: [/node_modules\/yargs/],
    excludeAssets: [
      /\.json$/,
      /\.jpg$/,
      /\.png$/,
      /\.bmp$/,
      /\.map$/,
      /\.css$/,
      /\.html$/,
      /\.ico$/,
    ]

  },

}

if (isDevMode) {
  config.mode = "development";
  config.devtool = "eval";
}

module.exports = config;