#!/usr/bin/env node
const pkg = require('tslint-dw/package.json')
const program = require('commander')

program
    .version(pkg.version)
    .option('-p, --prettier', 'Configure prettier')
    .parse(process.argv)

if (program.prettier) {
    require('tslint-dw/scripts/prettier')
} else {
    program.help()
}
