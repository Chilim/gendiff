#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option("-h, --help", "output usage information")
  .option("-V, --version", "output the version number")
  .option("-f, --format [type]", "output format")
  .arguments('<firstArgument> <secondArgumant>')
  .parse(process.argv);

if (!program.args.length) program.help();

// console.log('Do me a favour');
