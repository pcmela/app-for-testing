var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browserSync;

gulp.task('nodemon', function(cb) {
  var nodemon = require('gulp-nodemon');

  // We use this `called` variable to make sure the callback is only executed once
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js', 'server/**/*.*']
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
    }
    called = true;
  })
  .on('restart', function onRestart() {

    // Also reload the browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

gulp.task('browserSync', ['build', 'nodemon'], function() {
  browserSync(config);
});
