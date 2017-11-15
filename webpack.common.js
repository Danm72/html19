var path     = require('path');
var webpack  = require('webpack');
var themeUrl = 'wp/wp-content/themes/' + theme;

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [
          /(node_modules|bower_components)/
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }, {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx']
  },
  target: 'web'
}
