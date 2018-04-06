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

const prettierrcPath = {
    type: 'input',
    name: 'prettierrcPath',
    message: 'Where would you like us to place your .prettierrc?',
    default: path.resolve('./.prettierrc'),
    when: answers => answers.includePrettierrc,
}

const includeTslintPrettier = {
    type: 'confirm',
    name: 'includeTslintPrettier',
    message: `Do you want to include the tslint-prettier package inside of ${
        pkg.name
    } automatically?`,
    default: true,
}

const copyFiles = ({
    includePrettierrc,
    prettierrcPath,
    includeTslintPrettier,
}) => {
    if (includePrettierrc) {
        createReadStream(path.join(__dirname, '../.prettierrc')).pipe(
            createWriteStream(prettierrcPath, (one, two) =>
                console.log('one', one, 'two', two),
            ),
        )
    }

    if (includeTslintPrettier) {
        createReadStream(path.join(__dirname, '../tslint-prettier.json')).pipe(
            createWriteStream(
                path.join(__dirname, '../.tslint.json'),
                (one, two) => console.log('one', one, 'two', two),
            ),
        )
    } else {
        console.log('poop')
    }
    console.log(includePrettierrc, prettierrcPath, includeTslintPrettier)
}

console.log(chalk.white.bgRed(' Configuring prettier... '))
inquirer
    .prompt([includePrettierrc, prettierrcPath, includeTslintPrettier])
    .then(copyFiles)
