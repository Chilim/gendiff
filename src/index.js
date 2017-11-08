import fs from 'fs';
import path from 'path';
import getAst from './ast';

const getFormat = (format) => {
  if (format === '.json') return JSON.parse;
  return safeLoad;
};

const output = (dsl) => {
  const result = dsl.map(obj => `${obj.operation} ${obj.key} : ${obj.value} \n`);
  return `{${result.join('')}}`;
};

export default (firstFilePath, secondFilePath) => {
  const getFirstFile = fs.readFileSync(firstFilePath, 'utf8');
  const getSecondFile = fs.readFileSync(secondFilePath, 'utf8');
  const format = path.extname(getFirstFile).slice(1);
  const firstFileContent = getFormat(format)(getFirstFile);
  const secondFileContent = getFormat(format)(getSecondFile);
  const ast = getAst(firstFileContent, secondFileContent);
  return output(ast);
};
