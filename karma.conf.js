module.exports = function(config) {
  config.set({

    basePath: '',
    port: 9876,
    
    frameworks: [
      'mocha',
      'chai-sinon'
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
