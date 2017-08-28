"use strict";

import pngquant from 'imagemin-pngquant';
import del from 'del';
import browserSync from 'browser-sync';
const reload = browserSync.reload;
import runSequence from 'run-sequence';

import gulp from 'gulp';
import babel from "gulp-babel";
import prefix from 'gulp-autoprefixer';
import changed from 'gulp-changed';
import concat from 'gulp-concat';
import nunjucksRender from 'gulp-nunjucks-render';
import imagemin from 'gulp-imagemin';
import inject from 'gulp-inject';
import notify from "gulp-notify";
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

const plumberErrorNotify = {
  errorHandler: notify.onError("Error: <%= error.message %>")
};

//start default or specific tasks
gulp.task('clean', () => del(['dist', 'dev']));
//end default or specific tasks

//start only deploy tasks
gulp.task('copyVendorJs', () => {
  return gulp.src([
    'src/js/vendor/!(jquery)*.js',
    'src/js/vendor/*.js',
    'src/js/vendor/(jquery)*.js'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(gulp.dest('dist/js/vendor'))
    .pipe(notify({
      "title": "Another scripts",
      "message": "Scripts moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', ['copyVendorJs'], () => {
  return gulp.src(['src/*.html'])
    .pipe(plumber(plumberErrorNotify))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(inject(
      gulp.src([
        'dist/js/vendor/jquery.js',
        'dist/js/vendor/*.js'
      ], {
        read: false
      }), {
        addRootSlash: false,
        transform: function (filePath, file, i, length) {
          return '<script src="' + filePath.replace('dist/', '') + '"></script>';
        }
      }))
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      "title": "Html",
      "message": "Html import refresh done!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copyFonts', () => {
  return gulp.src([
    'src/fonts/**/*'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(gulp.dest('dist/fonts'))
    .pipe(notify({
      "title": "Fonts",
      "message": "Fonts moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copyData', () => {
  return gulp.src([
    'src/data/**/*'
  ], {base: './src/'})
    .pipe(plumber(plumberErrorNotify))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({
      "title": "Data",
      "message": "Data moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('styles', () => {
  return gulp.src([
    'src/scss/main.scss'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concat('main.css'))
    .pipe(prefix({
      browsers: ['ie 10', 'last 2 version']
    }))
    .pipe(size({
      "title": "Styles size of"
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({
      "title": "Styles",
      "message": "css compiled!!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', () => {
  return gulp.src([
    'src/img/**/*'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      pngquant(),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeTitle: true},
          {removeDesc: true},
          {removeComments: true}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({
      "title": "Images",
      "message": "images compiled!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('scripts', () => {
  return gulp.src([
    '!src/js/vendor/*.js',
    'src/js/**/!(main)*.js',
    'src/js/main.js'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(babel({
      presets: ['env'],
      only: [
        "main.js"
      ]
    }))
    .pipe(concat('main.js')) /*build single file*/
    .pipe(uglify())
    .pipe(size({
      "title": "Scripts size of"
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({
      "title": "JS",
      "message": "scripts compiled!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('default', ['clean'], (cb) => {
  runSequence(
    [
      'styles',
      'copyData',
      'scripts',
      'copyFonts',
      'html',
      'copyVendorJs'
    ],
    'images', /*images optimization can be with delay, must wait*/
    cb
  );
});
//end only deploy tasks

//start only dev tasks
gulp.task('copyVendorJsDev', () => {
  return gulp.src([
    'src/js/vendor/!(jquery)*.js',
    'src/js/vendor/*.js',
    'src/js/vendor/(jquery)*.js'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(changed('dev/js/vendor'))
    .pipe(gulp.dest('dev/js/vendor'))
    .pipe(notify({
      "title": "Another scripts",
      "message": "Scripts moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('htmlDev', ['copyVendorJsDev'], () => {
  return gulp.src(['src/*.html'])
    .pipe(plumber(plumberErrorNotify))
    .pipe(changed('dev/*.html'))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(inject(
      gulp.src([
        'dev/js/vendor/jquery.js',
        'dev/js/vendor/*.js'
      ], {
        read: false
      }), {
        addRootSlash: false,
        transform: function (filePath, file, i, length) {
          return '<script src="' + filePath.replace('dev/', '') + '"></script>';
        }
      }))
    .pipe(gulp.dest('dev'))
    .pipe(notify({
      "title": "Html",
      "message": "Html import refresh done!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copyFontsDev', () => {
  return gulp.src([
    'src/fonts/**/*'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(changed('dev/fonts'))
    .pipe(gulp.dest('dev/fonts'))
    .pipe(notify({
      "title": "Fonts",
      "message": "Fonts moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copyDataDev', () => {
  return gulp.src([
    'src/data/**/*'
  ], {base: './src/'})
    .pipe(plumber(plumberErrorNotify))
    .pipe(gulp.dest('dev/'))
    .pipe(notify({
      "title": "Data",
      "message": "Data moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('stylesDev', () => {
  return gulp.src([
    'src/scss/main.scss'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(changed('dev/css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(prefix({
      browsers: ['ie 10', 'last 2 version']
    }))
    .pipe(sourcemaps.write())
    .pipe(concat('main.css'))
    .pipe(size({
      "title": "Styles size of"
    }))
    .pipe(gulp.dest('dev/css'))
    .pipe(notify({
      "title": "Styles",
      "message": "css compiled!!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('imagesDev', () => {
  return gulp.src([
    'src/img/**/*'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(changed('dev/img'))
    .pipe(gulp.dest('dev/img'))
    .pipe(notify({
      "title": "Images dev",
      "message": "images moved!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('scriptsDev', () => {
  return gulp.src([
    '!src/js/vendor/*.js',
    'src/js/**/!(main)*.js',
    'src/js/main.js'
  ])
    .pipe(plumber(plumberErrorNotify))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env'],
      only: [
        "main.js"
      ]
    }))
    .pipe(concat('main.js')) /*build single file*/
    .pipe(uglify({
      mangle: false,
      compress: false,
      output: {beautify: true}
    }))
    .pipe(sourcemaps.write())
    .pipe(size({
      "title": "Scripts size of"
    }))
    .pipe(gulp.dest('dev/js'))
    .pipe(notify({
      "title": "JS",
      "message": "scripts compiled!",
      "onLast": true
    }))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('dev', ['clean'], (cb) => {
  runSequence(
    [
      'stylesDev',
      'copyDataDev',
      'scriptsDev',
      'copyFontsDev',
      'htmlDev',
      'copyVendorJsDev'
    ],
    'imagesDev', /*images optimization can be with delay, must wait*/
    cb
  );
});

gulp.task('serve', ['dev'], () => {
  browserSync({
    tunnel: false,
    //tunnel: "gulp-project-starter",
    https: false,
    notify: false,
    port: 8080,
    server: {
      baseDir: ['dev']
    }
  });

  gulp.watch(['src/data/**/*'], ['copyDataDev']);
  gulp.watch(['src/js/vendor/*.js'], ['copyVendorJsDev']);
  gulp.watch(['src/scss/**/*'], ['stylesDev']);
  gulp.watch(['src/img/**/*'], ['imagesDev']);
  gulp.watch(['src/fonts/**/*'], ['copyFontsDev']);
  gulp.watch(['src/js/**/*'], ['scriptsDev']);
  gulp.watch(['src/*.html', 'src/templates/*.html', 'src/templates/**/*.html'], ['htmlDev']);
});
//end only dev tasks