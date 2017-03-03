'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const mockPrompts = {
  projectTitleName: 'Test title name',
  projectName: 'Test project name',
  projectDescriptionText: 'Test text',
  projectAuthorName: 'Test text',
  projectAuthorEmail: 'Test text'
};

describe('generator-uamithril-web-starter:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts(mockPrompts)
    .toPromise()
  );

  it('creates expected files', () => {
    assert.file([
      'src/',
      '.babelrc',
      '.gitignore',
      'gulpfile.babel.js',
      'package.json',
      'readme.md',
      'yarn.lock'
    ]);
  });
  it('content exist', () => {
    assert.fileContent([
      ['readme.md', mockPrompts.projectTitleName],
      ['package.json', mockPrompts.projectName],
      ['package.json', mockPrompts.projectDescriptionText],
      ['package.json', mockPrompts.projectAuthorName],
      ['package.json', mockPrompts.projectAuthorEmail]
    ]);
  });
  it('gulpfile.babel.js should contain tasks', () => {
    [
      'default',
      'serve'
    ].forEach(task => {
      assert.fileContent('gulpfile.babel.js', `gulp.task('${task}`);
    });
  });
});
