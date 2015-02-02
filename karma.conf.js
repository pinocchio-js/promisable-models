module.exports = function(config) {
  config.set({

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter'
    ],
    
    basePath: '',
    port: 9876,
    
    frameworks: [
      'mocha'
    ],

    files: [
      'lib/promisable.model.js',
      'test/**/*_spec.js'
    ],

    reporters: ['mocha'],
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: true,
    singleRun: false,

    browsers: [
      'PhantomJS', 
      'Chrome'
    ]
  });
};
