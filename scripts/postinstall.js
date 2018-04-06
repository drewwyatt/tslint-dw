const chalk = require('chalk')
const pkg = require('../package.json')

console.log(' ')
console.log(
    chalk.white.bgRed(` Thank you for using ${pkg.name} (v${pkg.version})`),
)
console.log(
    'If you would like to include the recommended prettier config, run:',
)
console.log(chalk.white.bgBlack(`$ npx ${pkg.name} --prettier`))
