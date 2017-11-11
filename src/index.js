import fs from 'fs';
import path from 'path';
import getAst from './lib/ast';
import formatActions from './lib/parser';

const getExtenAction = exten => formatActions[exten];

const render = (ast) => {
  const result = ast.map(obj => `${obj.operation} ${obj.key} : ${obj.value} \n`);
  return `{\n${result.join('')}}`;
};

export default (firstFilePath, secondFilePath) => {
  const firstObj = fs.readFileSync(firstFilePath, 'utf8');
  const secondObj = fs.readFileSync(secondFilePath, 'utf8');
  const exten = path.extname(firstFilePath);
  const extenAction = getExtenAction(exten);
  const firstFileContent = extenAction(firstObj);
  const secondFileContent = extenAction(secondObj);
  return render(getAst(firstFileContent, secondFileContent));
};
