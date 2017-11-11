import _ from 'lodash';

const makeObj = ({ key, secondVal, firstVal, children = [], operation }) => {
  return { key, firstVal, secondVal, children, operation };
};

const getAst = (firstObj, secondObj) => _.union(_.keys(firstObj), _.keys(secondObj))
  .map((key) => {
    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      if (_.isObject(secondObj[key])) {
        return makeObj({ key, children: getAst(secondObj[key], secondObj[key]), operation: 'added' });
      }
      return makeObj({ key, secondVal: secondObj[key], operation: 'added' });
    }
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      if (_.isObject(firstObj[key])) {
        return makeObj({ key, children: getAst(firstObj[key], firstObj[key]), operation: 'deleted' });
      }
      return makeObj({ key, firstVal: firstObj[key], operation: 'deleted' });
    }
    if (!_.isObject(firstObj[key]) && !_.isObject(secondObj[key])) {
      if (firstObj[key] === secondObj[key]) {
        return makeObj({ key, firstVal: firstObj[key], secondVal: secondObj[key], operation: 'draw' });
      }
      return makeObj({ key, firstVal: firstObj[key], secondVal: secondObj[key], operation: 'changed' });
    }
    return makeObj({ key, children: getAst(firstObj[key], secondObj[key]), operation: 'draw' });
  });

export default getAst;
