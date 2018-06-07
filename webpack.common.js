const path = require('path');

module.exports = {
  entry: `./js/main.js`,
  output: {
    path: path.resolve(__dirname, `/dist`),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude:  ['node_modules'],
        loader: 'babel-loader'
      }, {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx']
  }
}
