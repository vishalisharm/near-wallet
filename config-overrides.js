const webpack = require('webpack');

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  config.resolve.fallback = {
    url: require.resolve("url/"),
    vm: require.resolve("vm-browserify"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    assert: require.resolve("assert/"),
    process: require.resolve('process/browser'),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
  };

  if (!config.module) {
    config.module = { rules: [] };
  }
  config.module.rules.push({
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre",
    exclude: /node_modules\/@meteorwallet\/sdk/
  });

  return config;
};