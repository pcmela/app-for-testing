/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var requireDir = require('require-dir');

var gulp = require('gulp');
var debug = require('gulp-debug');
 

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

/*
gulp.task('default', function () {
    return gulp.src('./gulp/tasks/*.js')
        .pipe(debug({title: 'unicorn:'}))
        .pipe(gulp.dest('dist'));
});
*/