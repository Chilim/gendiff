import _ from 'lodash';
import fs from 'fs';

const compareContents = (firstObj, secondObj) => _.union(_.keys(firstObj), _.keys(secondObj))
  .reduce((acc, key) => {
    if (_.has(firstObj, key) && _.has(secondObj, key)) {
      if (firstObj[key] === secondObj[key]) {
        return [...acc, { key, value: firstObj[key], operation: '' }];
      }
      const newAcc = [...acc, { key, value: secondObj[key], operation: '-' }];
      return [...newAcc, { key, value: firstObj[key], operation: '+' }];
    }
    return [...acc, { key, value: secondObj[key], operation: '+' }];
  }, []);

const output = (dsl) => {
  const result = dsl.map(obj => `${obj.operation} ${obj.key} : ${obj.value} \n`);
  return `{${result.join('')}}`;
};

export default (firstFilePath, secondFilePath) => {
  const getFirstFile = fs.readFileSync(firstFilePath, 'utf8');
  const firstFileContent = JSON.parse(getFirstFile);
  const getSecondFile = fs.readFileSync(secondFilePath, 'utf8');
  const secondFileContent = JSON.parse(getSecondFile);
  const dsl = compareContents(firstFileContent, secondFileContent);
  return output(dsl);
};
