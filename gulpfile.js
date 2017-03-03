'use strict';
const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-babel-istanbul');
const nsp = require('gulp-nsp');
const plumber = require('gulp-plumber');

gulp.task('static', () => gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('nsp', cb => {
  nsp({
    package: path.resolve('package.json')
  }, cb);
});

gulp.task('pre-test', () => gulp.src('generators/**/*.js')
  .pipe(istanbul())
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], cb => {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', err => {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', () => {
      cb(mochaErr);
    });
});

gulp.task('watch', () => {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
