import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getDiff from './lib/ast';
import render from './lib/render';
// const fs = require('fs');
// const path = require('path');
// const yaml = require('js-yaml');
// const ini = require('ini');
// const getDiff = require('./lib/ast');
// const render = require('./lib/render');

// const before = 'tests/fixtures/before2.json';
// const after = 'tests/fixtures/after2.json';

const formatActions = {
  '.json': JSON.parse,
  '.yaml': arg => yaml.safeLoad(arg),
  '.ini': arg => ini.parse(arg),
};

const getExtenAction = exten => formatActions[exten];

const genDiff = (firstFilePath, secondFilePath) => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const exten = path.extname(firstFilePath);
  const extenAction = getExtenAction(exten);
  const firstFileContent = extenAction(firstObj);
  const secondFileContent = extenAction(secondObj);
  const ast = getDiff(firstFileContent, secondFileContent);
  const result = render(ast);
  console.log(result);
  return result;
};
// module.exports = genDiff;

export default genDiff;
