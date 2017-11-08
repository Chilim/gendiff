import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parse from './ast';

const formatActions = {
  json: arg => JSON.parse(arg),
  yml: arg => yaml.safeLoad(arg),
};

const getFormatAction = (extention, pathToFile) => formatActions[extention](pathToFile);

const render = (ast) => {
  const result = ast.map(obj => `${obj.operation} ${obj.key} : ${obj.value} \n`);
  return `{${result.join('')}}`;
};

export default (firstFilePath, secondFilePath) => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const format = path.extname(firstFilePath).slice(1);
  const firstFileContent = getFormatAction(format, firstObj);
  const secondFileContent = getFormatAction(format, secondObj);
  return render(parse(firstFileContent, secondFileContent));
};
