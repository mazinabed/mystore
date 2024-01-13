const path = require('path');

module.exports = {
  // Other configuration options...
  resolve: {
    extensions: ['.js', '.mjs', '.json'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
    },
  },
};
