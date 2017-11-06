#!/usr/bin/env node
import program from 'commander';
import comparator from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstArgument> <secondArgument>')
  .action((firstArgument, secondArgument) => {
    console.log(comparator(firstArgument, secondArgument));
  })
  .parse(process.argv);

if (!program.args.length) program.help();

// console.log('Do me a favour');
