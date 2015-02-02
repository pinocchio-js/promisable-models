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
      'vendor/jquery/dist/jquery.js',
      'vendor/underscore/underscore.js',
      'vendor/backbone/backbone.js',
      'vendor/marionette/lib/backbone.marionette.js',
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
