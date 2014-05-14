module.exports = function(config) {
  config.set({
  basePath: '',

  files: [
    // Libraries
    'bower_components/angular/angular.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-mocks/angular-mocks.js',

    // App
    'src/angular-csv/*.js',
    'src/angular-csv/directives/*.js',
    'src/angular-csv/services/*.js',

    // Test specs
    'test/unit/**/*Spec.js',
    'test/unit/**/**/*Spec.js'
  ],

  autoWatch: true,
  frameworks: ['jasmine'],
  browsers: ['Chrome'],

  junitReporter: {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
  }
});};
