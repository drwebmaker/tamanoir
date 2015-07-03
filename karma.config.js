module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'src/bower_components/**/*.js', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/**/*Spec.js', included: false},

      'test/test-main.js'
    ],
    browsers: ['PhantomJS']
  });
};