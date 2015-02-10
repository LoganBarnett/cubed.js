'use strict';

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'node_modules/lodash/dist/lodash.js'
      , 'src/cubed.js', 'src/**/*.js'
      //{pattern: 'src/**/*.spec.js', included: false},
      //{pattern: 'src/**/*!(.spec).js', included: false},
      //{pattern: 'node_modules/lodash/dist/lodash.js', included: false},
      //{pattern: 'requirejs_placation.js', included: true}
    ],
    frameworks: ['jasmine'],
    baseUrl: '/base'
    //logLevel: config.LOG_DEBUG
    //captureTimeout: 30000,
    //browserNoActivityTimeout: 2000000
  });
};
