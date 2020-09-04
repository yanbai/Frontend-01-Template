module.exports = {
  entry: './main.js',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        // https://github.com/babel/babel-loader
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [[
            // https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
            '@babel/plugin-transform-react-jsx',
            {
              pragma: 'createElement'
            }
          ]]
        }
      }
    }]
  },
  mode: 'development',
  optimization: {
    minimize: false,
  }
}
