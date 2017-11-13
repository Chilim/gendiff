import _ from 'lodash';

const unwrapObject = (obj, shift) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(shift)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(shift - 3)}  }`;
};

const isSimpObj = (type, value) =>
  type !== 'hasChildren' && type !== 'changed' && _.isObject(value);

const renderToString = (ast) => {
  const space = ' ';
  const doubleShift = 4;
  const result = (tree, shift) => tree.map((obj) => {
      const spaces = space.repeat(shift);
      const newValue = isSimpObj(obj.type, obj.value) ? unwrapObject(obj.value, shift + doubleShift)
        : obj.value;
      switch (obj.type) {
        case 'hasChildren':
          return `${spaces}  ${obj.key}: {\n${result(obj.value, shift + doubleShift)}\n${spaces}  }`;
        case 'unchanged':
          return `${spaces}  ${obj.key}: ${newValue}`;
        case 'changed':
          return `${spaces}+ ${obj.key}: ${newValue.newVal}\n${spaces}- ${obj.key}: ${newValue.oldVal}`;
        case 'added':
          return `${spaces}+ ${obj.key}: ${newValue}`;
        case 'deleted':
          return `${spaces}- ${obj.key}: ${newValue}`;
        default:
          return null;
      }
    }).join('\n');
    return `{\n${result(ast, 2)}\n}`;
  };

export default renderToString;
