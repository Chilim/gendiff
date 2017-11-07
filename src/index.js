import fs from 'fs';


const compareContents = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  secondObjKeys.reduce((acc, key) => {
    if (firstObjKeys.includes(key)) {
      if (firstObj[key] === secondObj[key]) {
        return [...acc, { key, value: firstObj[key], operation: '' }];
      }
      const newAcc = [...acc, { key, value: firstObj[key], operation: '-' }];
      return [...newAcc, { key, value: secondObj[key], operation: '+' }];
    }
    return [...acc, { key, value: secondObj[key], operation: '+' }];
  }, []);
};

const output = (dsl) => {
  const result = dsl.map(el => `${el.operation} ${el.key} : ${el.value} \n`);
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
