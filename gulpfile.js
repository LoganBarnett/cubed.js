'use strict';

var gulp = require('gulp');
var karma = require('karma');


gulp.task('test', function(done) {
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  },
    done
  );
});