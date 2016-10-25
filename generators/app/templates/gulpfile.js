"use strict";

var pngquant = require('imagemin-pngquant');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');

var gulp = require('gulp');
var babel = require("gulp-babel");
var prefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var plumberErrorNotify = {
	errorHandler: notify.onError("Error: <%= error.message %>")
};

//start default or specific tasks
gulp.task('clean', function (cb) {
	return del(['dist', 'dev'], cb);
});
//end default or specific tasks

//start only deploy tasks
gulp.task('copy_vendor_js', function () {
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

gulp.task('html', ['copy_vendor_js'], function () {
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

gulp.task('copy_fonts', function () {
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

gulp.task('copy_data', function () {
	return gulp.src([
		'src/data/**/*'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(gulp.dest('dist/data'))
		.pipe(notify({
			"title": "Data",
			"message": "Data moved!",
			"onLast": true
		}))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('styles', function () {
	return gulp.src([
		'src/scss/main.scss'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(concat('main.css'))
		.pipe(prefix({
			browsers: ['ie 8', 'opera 12', 'ff 15', 'chrome 25', 'last 2 version']
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

gulp.task('images', function () {
	return gulp.src([
		'src/img/**/*'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 3,
			use: [pngquant()],
			interlaced: true
		}))
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

gulp.task('scripts', function () {
	return gulp.src([
		'!src/js/vendor/*.js',
		'src/js/**/!(main)*.js',
		'src/js/main.js'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(babel())
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

gulp.task('default', ['clean'], function (cb) {
	runSequence(
		[
			'styles',
			'copy_data',
			'scripts',
			'copy_fonts',
			'html',
			'copy_vendor_js'
		],
		'images', /*images optimization can be with delay, must wait*/
		cb
	);
});
//end only deploy tasks

//start only dev tasks
gulp.task('copy_vendor_js-dev', function () {
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

gulp.task('html-dev', ['copy_vendor_js-dev'], function () {
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

gulp.task('copy_fonts-dev', function () {
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

gulp.task('copy_data-dev', function () {
	return gulp.src([
		'src/data/**/*'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dev/data'))
		.pipe(gulp.dest('dev/data'))
		.pipe(notify({
			"title": "Data",
			"message": "Data moved!",
			"onLast": true
		}))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('styles-dev', function () {
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
			browsers: ['ie 8', 'opera 12', 'ff 15', 'chrome 25', 'last 2 version']
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

gulp.task('images-dev', function () {
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

gulp.task('scripts-dev', function () {
	return gulp.src([
		'!src/js/vendor/*.js',
		'src/js/**/!(main)*.js',
		'src/js/main.js'
	])
		.pipe(plumber(plumberErrorNotify))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.js')) /*build single file*/
		.pipe(uglify({
			mangle: false,
			compress: false,
			output: { beautify: true }
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

gulp.task('dev', ['clean'], function (cb) {
	runSequence(
		[
			'styles-dev',
			'copy_data-dev',
			'scripts-dev',
			'copy_fonts-dev',
			'html-dev',
			'copy_vendor_js-dev'
		],
		'images-dev', /*images optimization can be with delay, must wait*/
		cb
	);
});

gulp.task('serve', ['dev'], function () {
	browserSync({
		tunnel: false,
		//tunnel: "project-web-version",
		https: false,
		notify: false,
		port: 8080,
		server: {
			baseDir: ['dev']
		}
	});

	gulp.watch(['src/data/**/*'], ['copy_data-dev']);
	gulp.watch(['src/js/vendor/*.js'], ['copy_vendor_js-dev']);
	gulp.watch(['src/scss/**/*'], ['styles-dev']);
	gulp.watch(['src/img/**/*'], ['images-dev']);
	gulp.watch(['src/fonts/**/*'], ['copy_fonts-dev']);
	gulp.watch(['src/js/**/*'], ['scripts-dev']);
	gulp.watch(['src/*.html', 'src/templates/*.html', 'src/templates/**/*.html'], ['html-dev']);
});
//end only dev tasks