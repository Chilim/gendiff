const _ = require('lodash');

const makeObj = ({ key, oldVal, newVal, type }) => {
  const obj = { key, oldVal, newVal, type };
  return obj;
};

const getDiff = (firstObj, secondObj) => _.union(_.keys(firstObj), _.keys(secondObj))
  .map((key) => {
    if (_.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
      return makeObj({ key, oldVal: getDiff(firstObj[key], secondObj[key]), type: 'hasChildren' });
    }
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      return makeObj({ key, oldVal: firstObj[key], type: 'deleted' });
    }
    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      return makeObj({ key, newVal: secondObj[key], type: 'added' });
    }
    if (_.has(firstObj, key) && _.has(secondObj, key) && firstObj[key] === secondObj[key]) {
      return makeObj({ key, oldVal: firstObj[key], type: 'unchanged' });
    }
    return makeObj({ key, oldVal: firstObj[key], newVal: secondObj[key], type: 'changed' });
  });

export default getDiff;
