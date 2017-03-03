'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

function makeProjectName(name) {
  name = _.kebabCase(name);
  return name;
}

module.exports = class extends yeoman {
  prompting() {
    this.log(yosay(
      `Welcome to the ${chalk.green('uamithril-web-starter')} generator!`
    ));

    const prompts = [
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

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }
  writing() {
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
    );
    this.fs.copy(
      this.templatePath('src/gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('.csscomb.json'),
      this.destinationPath('.csscomb.json')
    );
    this.fs.copy(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        projectDescriptionText: this.props.projectDescriptionText,
        projectAuthorName: this.props.projectAuthorName,
        projectAuthorEmail: this.props.projectAuthorEmail
      }
    );
    this.fs.copyTpl(
      this.templatePath('readme.md'),
      this.destinationPath('readme.md'),
      {
        projectTitleName: this.props.projectTitleName
      }
    );
    this.fs.copy(
      this.templatePath('yarn.lock'),
      this.destinationPath('yarn.lock')
    );
  }
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      callback: error => {
        if (error) {
          this.log('… or alternatively run ' +
            chalk.yellow('npm install') +
            ' instead.');
        } else {
          this.log(yosay(`That’s it. Feel free to fire up the server with ${chalk.green('gulp serve')}`));
        }
      }
    });
  }
};
