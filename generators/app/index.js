'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

function makeProjectName(name) {
	name = _.kebabCase(name);
	return name;
}

module.exports = yeoman.Base.extend({
	prompting: function () {
		this.log(yosay(
			'Welcome to the ' + chalk.green('uamithril-web-starter') + ' generator!'
		));

		var prompts = [
			{
				type: 'input',
				name: 'projectTitleName',
				message: 'Type Title name of your project (Will be included in many places like title)',
				default: 'New project'
			},
			{
				type: 'input',
				name: 'projectName',
				message: 'Type short name of your project (Lowercase and with NO spaces, will be used for project folder)',
				filter: makeProjectName,
				default: 'new-project'
			},
			{
				type: 'input',
				name: 'projectDescriptionText',
				message: 'Type short Description text for your project',
				default: 'Base project Description'
			},
			{
				type: 'input',
				name: 'projectAuthorName',
				message: 'Type project Author Name or nickname',
				default: 'Nice Developer'
			},
			{
				type: 'input',
				name: 'projectAuthorEmail',
				message: 'Type project Author Email',
				default: 'example@example.com'
			}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},
	writing: {
		srcFiles: function () {
			this.fs.copy(
				this.templatePath('src/js'),
				this.destinationPath('src/js')
			);
			this.fs.copy(
				this.templatePath('src/scss'),
				this.destinationPath('src/scss')
			);
			this.fs.copy(
				this.templatePath('src/templates'),
				this.destinationPath('src/templates')
			);
			this.fs.copy(
				this.templatePath('src/index.html'),
				this.destinationPath('src/index.html')
			)
		},
		cssComb: function () {
			this.fs.copy(
				this.templatePath('.csscomb.json'),
				this.destinationPath('.csscomb.json')
			)
		},
		gulpFile: function () {
			this.fs.copy(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js')
			);
		},
		git: function () {
			this.fs.copy(
				this.templatePath('src/gitignore'),
				this.destinationPath('.gitignore')
			);
		},
		readMe: function () {
			this.fs.copyTpl(
				this.templatePath('readme.md'),
				this.destinationPath('readme.md'),
				{
					projectTitleName: this.props.projectTitleName
				}
			)
		},
		packageJson: function () {
			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('package.json'),
				{
					projectName: this.props.projectName,
					projectDescriptionText: this.props.projectDescriptionText,
					projectAuthorName: this.props.projectAuthorName,
					projectAuthorEmail: this.props.projectAuthorEmail
				}
			)
		}
	},
	install: function () {
		this.npmInstall();
	}
});
