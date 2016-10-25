'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var mockPrompts = {
	projectTitleName: 'Test title name',
	projectName: 'Test project name',
	projectDescriptionText: 'Test text',
	projectAuthorName: 'Test text',
	projectAuthorEmail: 'Test text'
};

describe('generator-uamithril-web-starter:app', function () {
	before(function () {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts(mockPrompts)
			.toPromise();
	});

	it('creates expected files', function () {
		assert.file([
			'src/',
			'.babelrc',
			'.gitignore',
			'gulpfile.babel.js',
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
	it('gulpfile.babel.js should contain tasks', function () {
		[
			'default',
			'serve'
		].forEach(function (task) {
			assert.fileContent('gulpfile.babel.js', 'gulp.task(\'' + task);
		});
	});
});
