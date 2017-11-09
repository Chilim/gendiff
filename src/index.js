import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import parse from './parser';

const formatActions = [
  {
    format: arg => arg === '.json',
    process: obj => JSON.parse(obj),
  },
  {
    format: arg => arg === '.yaml',
    process: obj => yaml.safeLoad(obj),
  },
  {
    format: arg => arg === '.ini',
    process: obj => ini.parse(obj),
  },
];

const getFormatAction = extention => _.find(formatActions, ({ format }) => format(extention));

const render = (ast) => {
  const result = ast.map(obj => `${obj.operation} ${obj.key} : ${obj.value} \n`);
  return `{${result.join('')}}`;
};

export default (firstFilePath, secondFilePath) => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const extention = path.extname(firstFilePath);
  const { process } = getFormatAction(extention);
  const firstFileContent = process(firstObj);
  const secondFileContent = process(secondObj);
  return render(parse(firstFileContent, secondFileContent));
};
