const chalk = require('chalk')
const pkg = require('../package.json')
const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

createReadStream(path.join(__dirname, '../tslint-no-prettier.json')).pipe(
    createWriteStream(path.join(__dirname, '../tslint.json'), (one, two) =>
        console.log('one', one, 'two', two),
    ),
)

console.log(' ')
console.log(
    chalk.white.bgRed(` Thank you for using ${pkg.name} (v${pkg.version})`),
)
console.log(
    'If you would like to include the recommended prettier config, run:',
)
console.log(chalk.white.bgBlack(`$ npx ${pkg.name} --prettier`))
