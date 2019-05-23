#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows differences.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstArgument> <secondArgument>')
  .action((firstFile, secondFile) => {
    console.log(genDiff(firstFile, secondFile, program.format));
  })
  .parse(process.argv);
