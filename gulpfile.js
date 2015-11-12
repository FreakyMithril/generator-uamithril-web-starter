"use strict";

var pngquant = require('imagemin-pngquant');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

var plumberErrorNotify = {
	errorHandler: notify.onError("Error: <%= error.message %>")
};

gulp.task('clean', function(cb) {
	return del(['dist'], cb);
});

gulp.task('html', ['copy_vendor_js'], function() {
	return gulp.src(['src/*.html'])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/*.html'))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(inject(
			gulp.src([
				'dist/js/vendor/*.js'
			], {
				read: false
			}), {
				addRootSlash: false,
				transform: function(filePath, file, i, length) {
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

gulp.task('copy_fonts', function() {
	return gulp.src([
			'src/fonts/**/*'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/fonts'))
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

gulp.task('copy_data', function() {
	return gulp.src([
			'src/data/**/*'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/data'))
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

gulp.task('styles', function() {
	return gulp.src([
			'src/scss/main.scss'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/css'))
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

gulp.task('images', function() {
	return gulp.src([
			'src/img/**/*'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/img'))
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

gulp.task('copy_vendor_js', function() {
	return gulp.src([
			'src/js/vendor/*.js'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/js/vendor'))
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

gulp.task('scripts', function() {
	return gulp.src([
			'!src/js/vendor/*.js',
			'src/js/**/!(main)*.js',
			'src/js/main.js'
		])
		.pipe(plumber(plumberErrorNotify))
		.pipe(changed('dist/js'))
		.pipe(concat('scripts.js'))
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

gulp.task('serve', ['default'], function() {
	browserSync({
		tunnel: false,
		//tunnel: "gulpprojectstarter",
		https: false,
		notify: false,
		port: 8080,
		server: {
			baseDir: ['dist']
		}
	});

	gulp.watch(['src/data/**/*'], ['copy_data']);
	gulp.watch(['src/js/vendor/*.js'], ['copy_vendor_js']);
	gulp.watch(['src/scss/**/*'], ['styles']);
	gulp.watch(['src/img/**/*'], ['images']);
	gulp.watch(['src/fonts/**/*'], ['copy_fonts']);
	gulp.watch(['src/js/**/*'], ['scripts']);
	gulp.watch(['src/*.html', 'src/inc/*.html'], ['html']);
});

gulp.task('default', ['clean'], function(cb) {
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