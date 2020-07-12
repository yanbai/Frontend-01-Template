module.exports = {
  entry: './selectorMatch.js',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  mode: 'development',
  optimization: {
    minimize: false
  }
}
