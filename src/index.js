'use strict';

module.exports = function (npm) {
  const spawn = require('child_process').spawn;
  const inquirer = require('inquirer');
  const pkgUp = require('pkg-up');

  pkgUp().then(filepath => {
    if (!filepath) {
      return console.log('No package.json file was found.')
    }

    const pkg = require(filepath);
    const deps = Object.keys(pkg.dependencies || {});
    const devDeps = Object.keys(pkg.devDependencies || {});

    let questions = [];

    if (deps.length) {
      questions.push({
        type: 'checkbox',
        name: 'deps',
        message: 'dependencies to uninstall?',
        choices: deps
      });
    }
    if (devDeps.length) {
      questions.push({
        type: 'checkbox',
        name: 'devDeps',
        message: 'dev dependencies to uninstall?',
        choices: devDeps
      });
    }

    if (!questions.length) {
      return console.log('No dependencies are installed.');
    }

    const ui = new inquirer.ui.BottomBar();
    ui.log.write(`* ${filepath}`);

    inquirer.prompt(questions).then(function (answers) {
      if (answers.deps && answers.deps.length) {
        answers.deps.forEach(dep => {
          spawn(npm, ['uninstall', '--save', dep], {
            stdio: 'inherit'
          });
        });
      }
      if (answers.devDeps && answers.devDeps.length) {
        answers.devDeps.forEach(dep => {
          spawn(npm, ['uninstall', '--save-dev', dep], {
            stdio: 'inherit'
          });
        });
      }
    });
  });
};
