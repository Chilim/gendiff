import _ from 'lodash';

export default (firstObj, secondObj) => _.union(_.keys(firstObj), _.keys(secondObj))
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
