const pkg = require('tslint-dw/package.json')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { createReadStream, createWriteStream, writeFileSync } = require('fs')
const path = require('path')

const Scripts = {
    tslintPrettierConfig: 'tslint-prettier-config',
}

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
    message: `Do you want to add tslint-config-prettier (included with this package) to your tslint.json file automatically?`,
    default: true,
}

const tslintJsonPath = {
    type: 'input',
    name: 'tslintJsonPath',
    message: 'Where is the tslint.json file that you would like updated?',
    default: path.resolve('./tslint.json'),
    when: answers => answers.includeTslintPrettier,
}

const copyFiles = ({
    includePrettierrc,
    prettierrcPath,
    includeTslintPrettier,
    tslintJsonPath,
}) => {
    if (includePrettierrc) {
        createReadStream(path.join(__dirname, '../.prettierrc')).pipe(
            createWriteStream(
                prettierrcPath,
                err => (err ? console.error(err) : null),
            ),
        )
    }

    if (includeTslintPrettier) {
        const tslintJson = require(tslintJsonPath)
        if (tslintJson) {
            const tslintExtends = tslintJson.extends
            if (tslintExtends) {
                const scripts = new Set(tslintExtends)

                // delete, then add, to make sure this is at the end of the set.
                scripts.delete(Scripts.tslintPrettierConfig)
                scripts.add(Scripts.tslintPrettierConfig)

                writeFileSync(
                    tslintJsonPath,
                    JSON.stringify({
                        ...tslintJson,
                        extends: Array.from(scripts),
                    }, null, 4),
                )
            } else {
                console.log('No tslint.json file found.')
            }
        }
    }
}

console.log(chalk.white.bgRed(' Configuring prettier... '))
inquirer
    .prompt([
        includePrettierrc,
        prettierrcPath,
        includeTslintPrettier,
        tslintJsonPath,
    ])
    .then(copyFiles)
