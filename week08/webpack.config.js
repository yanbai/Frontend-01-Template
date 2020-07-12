module.exports = {
  entry: {
    match_v1: './match_v1.js',
    match_v2: './match_v2.js'
  },
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
