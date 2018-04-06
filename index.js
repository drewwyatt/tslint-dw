const pkg = require('./package.json')
const program = require('commander')

program
    .version(pkg.version)
    .option('-p, --prettier', 'Configure prettier')
    .parse(process.argv)

if (program.prettier) {
    require('./scripts/prettier')
} else {
    console.log('poo')
}
