import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import getDiff from './lib/ast';
import render from './lib/render';

const formatActions = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getExtenAction = exten => formatActions[exten];

const genDiff = (firstFilePath, secondFilePath) => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const exten = path.extname(firstFilePath);
  const extenAction = getExtenAction(exten);
  const firstFileContent = extenAction(firstObj);
  const secondFileContent = extenAction(secondObj);
  return render(getDiff(firstFileContent, secondFileContent));
};

export default genDiff;
