/**
 * Created by javierl on 3/21/15.
 */


var path = require('path');
var node_modules = path.resolve(__dirname,'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var config = {
  entry: path.resolve(__dirname,'app/main.react.js'),
  output:{
    path: path.resolve(__dirname,'../build'),
    filename:"bundle.app"
  },
  resolve:{
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders:[
      //{ test:/\.react.js$/, loader:'jsx'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.less$|\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      { test: path.resolve(node_modules,'react/dist/react-with-addons.app'),loader:'expose?React'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),
    new ExtractTextPlugin("bundle.css")
  ]

};

module.exports = config;

