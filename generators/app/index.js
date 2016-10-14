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
			'Welcome to the ' + chalk.red('uamithril-web-starter') + ' generator!'
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
				message: 'Type short name of your project (Lowercase and with NO spaces)',
				filter: makeProjectName,
				default: 'new-project'
			},
			{
				type: 'confirm',
				name: 'useBuildInGit',
				message: 'Do you agree to NOT include "build" folder of project inside GIT repo? (it will make simpler commits)',
				default: true
			},
			{
				type: 'confirm',
				name: 'someAnswer',
				message: 'Would you like to enable this Test option? (Nothing happened - it is just a test)',
				default: true
			}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},

	writing: function () {
		this.fs.copy(
			this.templatePath(),
			this.destinationPath()
		);
	},

	install: function () {
		this.npmInstall();
	}
});
