const path = require('path');

module.exports = {
  entry: './src/js/*.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/temp/js')
  }
};