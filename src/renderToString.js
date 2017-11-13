import _ from 'lodash';

const unwrapObject = (obj, shift) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(shift)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(shift - 3)}  }`;
};

const isSimplObj = (type, value) =>
  type !== 'hasChildren' && type !== 'changed' && _.isObject(value);

const renderToString = (ast) => {
  const space = ' ';
  const doubleShift = 4;
  const result = (tree, shift) => tree.map((obj) => {
    const spaces = space.repeat(shift);
    const CurrVal = isSimplObj(obj.type, obj.oldValue) ?
      unwrapObject(obj.value, shift + doubleShift) : obj;
    switch (obj.type) {
      case 'hasChildren':
        return `${spaces}  ${obj.key}: {\n${result(obj.oldVal, shift + doubleShift)}\n${spaces}  }`;
      case 'unchanged':
        return `${spaces}  ${obj.key}: ${CurrVal}`;
      case 'changed':
        return `${spaces}+ ${obj.key}: ${CurrVal.newVal}\n${spaces}- ${obj.key}: ${CurrVal.oldVal}`;
      case 'added':
        return `${spaces}+ ${obj.key}: ${CurrVal}`;
      case 'deleted':
        return `${spaces}- ${obj.key}: ${CurrVal}`;
      default:
        return null;
    }
  }).join('\n');
  return `{\n${result(ast, 2)}\n}`;
};

export default renderToString;
