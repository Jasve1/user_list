const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  module: {
    rules: [{
        test: /\.s?css$/,
        use: [
          {
          loader: "style-loader"
          }, 
          {
          loader: "css-loader"
          }, 
          {
          loader: "sass-loader",
          }
        ]
    }]
  }
};