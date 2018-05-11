#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const path = require('path');
const exists = require('fs').existsSync;
const inquirer = require('inquirer');
const ora = require('ora');
// const home = require('user-home');
// const rm = require('rimraf').sync;
const logger = require('./lib/logger')

const packageJson = require('./package.json');
const templatePath = 'github:xinconan/tinyapp-template';

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    console.log(
      `      ${chalk.cyan(
        'https://github.com/xinconan/create-ali-app/issues/new'
      )}`
    );
    console.log();
  })
  .parse(process.argv);

// 没有传参数的时候，直接提示信息
if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-ali-app')}`);
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}

const rawName = program.args[0];
const inPlace = !rawName || rawName === '.';
const name = inPlace ? path.relative('../', process.cwd()) : rawName;
const to = path.resolve(rawName || '.');

// 暂时没必要做缓存
// const tmp = path.join(home, '.create-ali-app-temp');

if (inPlace || exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      run()
    }
  }).catch(logger.fatal)
} else {
  run()
}

/**
 * Check, download and generate the project
 */
function run(){
  console.log(rawName)
  downloadAndGenerate(templatePath);
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate (template) {
  const spinner = ora('downloading template')
  spinner.start()
  // Remove if local template exists
  // if (exists(tmp)) rm(tmp)
  download(template, to, err => {
    spinner.stop()
    if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    // generate(name, tmp, to, err => {
    //   if (err) logger.fatal(err)
    //   console.log()
      logger.success('Generated "%s".', name)
    // })
  })
}