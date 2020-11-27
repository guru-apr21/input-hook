const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js', // that's no problem
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/i,
        loader: ['style-loader,css-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
  },
};
