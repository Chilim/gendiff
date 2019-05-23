import _ from 'lodash';

const diffType = [
  { type: 'hasChild', check: (val1, val2) => _.isObject(val1) && _.isObject(val2) },
  { type: 'unchanged', check: (val1, val2) => val1 === val2 },
  { type: 'changed', check: (val1, val2) => (val1 && val2) },
  { type: 'deleted', check: (val1, val2) => (val2 === undefined) },
  { type: 'added', check: val1 => (val1 === undefined) },
];

const getType = (arg1, arg2) => _.find(diffType, ({ check }) => check(arg1, arg2));

const buildAst = (before, after) => _.union(_.keys(before), _.keys(after))
  .reduce((acc, key) => {
    const { type } = getType(before[key], after[key]);
    const children = (type === 'hasChild') ? buildAst(before[key], after[key]) : [];
    return [...acc, { key, type, oldValue: before[key], newValue: after[key], children }];
  }, []);

  export default buildAst;
