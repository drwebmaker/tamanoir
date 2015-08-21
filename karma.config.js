module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'src/bower_components/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'src/**/*.json', watched: true, included: false, served: true},

      'test/test-main.js'
    ],
    browsers: ['PhantomJS'],

    // list of files to exclude
    exclude: [
      "src/bower_components/**/*Spec.js"
    ],

    // web server port
    port: 9876,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};