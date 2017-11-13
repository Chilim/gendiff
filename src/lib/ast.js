const _ = require('lodash');

const makeObj = ({ key, value, type }) => {
  const obj = { key, value, type };
  return obj;
};

const getDiff = (firstObj, secondObj) => _.union(_.keys(firstObj), _.keys(secondObj))
  .map((key) => {
    if (_.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
      return makeObj({ key, value: getDiff(firstObj[key], secondObj[key]), type: 'hasChildren' });
    }
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      return makeObj({ key, value: firstObj[key], type: 'deleted' });
    }
    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      return makeObj({ key, value: secondObj[key], type: 'added' });
    }
    if (_.has(firstObj, key) && _.has(secondObj, key) && firstObj[key] === secondObj[key]) {
      return makeObj({ key, value: firstObj[key], type: 'unchanged' });
    }
    return makeObj({ key, value: { oldVal: firstObj[key], newVal: secondObj[key] }, type: 'changed' });
  });

export default getDiff;
