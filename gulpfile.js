/**
 * @fileoverview This is the file that determines the behavior of the Gulp task
 *   runner.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var gulp = require('gulp');

var compilerPackage = require('google-closure-compiler');
var gjslint = require('gulp-gjslint');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var lessAutoprefix = require('less-plugin-autoprefix');
var lessCleanCss = require('less-plugin-clean-css');
var path = require('path');

var getClosureCompilerConfiguration = function(options) {
  var basePath = path.dirname(__filename);
  var closureCompiler = compilerPackage.gulp();

  return closureCompiler({
    externs: [
      compilerPackage.compiler.CONTRIB_PATH + '/externs/jquery-1.9.js',
      basePath + '/extern/extern.js',
      basePath + '/extern/howlerjs.extern.js',
      basePath + '/extern/socket.io.extern.js',
      basePath + '/extern/threejs.extern.js'
    ],
    warning_level: 'VERBOSE',
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    js_output_file: options.filename || 'minified.js'
  });
};

var getLessConfiguration = function() {
  var autoprefix = new lessAutoprefix({
    browsers: ["last 2 versions"]
  });
  var cleanCss = new lessCleanCss({
    advanced: true
  });
  return less({
    plugins: [autoprefix, cleanCss]
  });
};

gulp.task('default', ['js-lint', 'js-compile', 'less']);

gulp.task('js', ['js-lint', 'js-compile']);

gulp.task('lint', ['js-lint']);

gulp.task('js-lint', function() {
  return gulp.src(['./extern/*.js',
                   './lib/**/*.js',
                   './public/js/**/*.js',
                   './shared/*.js' ])
    .pipe(gjslint({
      flags: ['--jslint_error indentation',
              '--jslint_error well_formed_author',
              '--jslint_error braces_around_type',
              '--jslint_error unused_private_members',
              '--jsdoc',
              '--max_line_length 80',
              '--error_trace'
             ]
    }))
    .pipe(gjslint.reporter('console'));
});

gulp.task('js-compile', function() {
  return gulp.src(['./public/js/**/*.js',
                   './shared/*.js'])
    .pipe(getClosureCompilerConfiguration({
      filename: 'minified.js'
    }))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('less', function() {
  return gulp.src('./public/less/index.less')
    .pipe(getLessConfiguration())
    .pipe(rename('minified.css'))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch-js', function() {
  gulp.watch(['./extern/*.js',
              './lib/**/*.js',
              './public/js/**/*.js',
              './shared/*.js' ], ['js-compile']);
});

gulp.task('watch-less', function() {
  gulp.watch('./public/less/*.less', ['less']);
});

gulp.task('watch', function() {
  gulp.watch(['./extern/*.js',
              './lib/**/*.js',
              './public/js/**/*.js',
              './shared/*.js' ], ['js-compile']);
  gulp.watch('./public/less/*.less', ['less']);
});
