const pkg = require('../package.json')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

const includePrettierrc = {
    type: 'confirm',
    name: 'includePrettierrc',
    message:
        'Do you want to include our recommended .prettierrc file in your project?',
    default: true,
}

const includeTslintPrettier = {
    type: 'confirm',
    name: 'includeTslintPrettier',
    message: `Do you want to include the tslint-prettier package inside of ${
        pkg.name
    } automatically?`,
    default: true,
}

const copyFiles = ({ includePrettierrc, includeTslintPrettier }) => {
    // if (includePrettier) {
    //     createReadStream(
    //         path.resolve('./node_modules/tslint-dw/tslint-prettier.json'),
    //     ).pipe(
    //         createWriteStream(
    //             path.resolve('./node_modules/tslint-dw/tslint.json'),
    //             (one, two) => console.log('one', one, 'two', two),
    //         ),
    //     )
    // } else {
    //     console.log('poop')
    // }
    console.log(includePrettierrc, includeTslintPrettier)
}

console.log(chalk.white.bgRed(' Configuring prettier... '))
inquirer.prompt([includePrettierrc, includeTslintPrettier]).then(copyFiles)
