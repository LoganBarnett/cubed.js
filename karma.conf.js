'use strict';

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      {pattern: 'src/**/*.spec.js', included: false},
      {pattern: 'src/**/*!(.spec).js', included: false},
      {pattern: 'node_modules/lodash/dist/lodash.js', included: false},
      {pattern: 'requirejs_placation.js', included: true}
    ],
    frameworks: ['jasmine', 'requirejs'],
    baseUrl: '/base'
    //logLevel: config.LOG_DEBUG
    //captureTimeout: 30000,
    //browserNoActivityTimeout: 2000000
  });
};