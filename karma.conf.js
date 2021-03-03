module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'webpack'],
    files: [
      // all files ending in ".test.js"
      // !!! use watched: false as we use webpacks watch
      { pattern: 'test/**/*test.js', watched: false }
    ],
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ],
    preprocessors: {
      // add webpack as preprocessor
      'test/**/*test.js': ['webpack']
    },
    webpack: {
      // karma watches the test entry points
      // Do NOT specify the entry option
      // webpack watches dependencies

      // webpack configuration
      resolve: {
        mainFields: ['browser', 'module', 'main'],
        alias: {
          process: 'process/browser'
        },
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
          // crypto: require.resolve('crypto-browserify'),
          // process: require.resolve('process/browser'),
          // stream: require.resolve('stream-browserify'),
          // assert: require.resolve('assert/'),
          // url: require.resolve('url/'),
          // buffer: require.resolve('buffer/'),
          // events: require.resolve('events/')
        }
      }
    }
  })
}
