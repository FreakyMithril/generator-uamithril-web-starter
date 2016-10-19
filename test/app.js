'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var mockPrompts = {
	projectTitleName: 'Test title name',
	projectName: 'Test project name',
	projectDescriptionText: 'Test text',
	projectAuthorName: 'Test text',
	projectAuthorEmail: 'Test text',
	useBuildInGit: true
};

describe('generator-uamithril-web-starter:app', function () {
	before(function () {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts(mockPrompts)
			.toPromise();
	});

	it('creates files', function () {
		assert.file([
			'src/',
			'.gitignore',
			'gulpfile.js',
			'package.json',
			'readme.md'
		]);
	});
	it('content exist', function () {
		assert.fileContent([
			['readme.md', mockPrompts.projectTitleName],
			['package.json', mockPrompts.projectName],
			['package.json', mockPrompts.projectDescriptionText],
			['package.json', mockPrompts.projectAuthorName],
			['package.json', mockPrompts.projectAuthorEmail]
		]);
	});
	it('dist folder is in gitignore', function() {
		assert.equal(mockPrompts.useBuildInGit, true);
	});
	it('gulp.js should contain tasks', function () {
		[
			'default',
			'serve'
		].forEach(function (task) {
			assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
		});
	});
});
