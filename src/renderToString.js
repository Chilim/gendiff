import _ from 'lodash';

const unwrapObject = (obj, shift) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(shift)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(shift - 3)}  }`;
};

const isSimplObj = (type, value) =>
  type !== 'hasChildren' && type !== 'changed' && _.isObject(value);

const unwrapObject = (obj, shift) => {
  const str = Object.keys(obj).map(key => `${' '.repeat(shift)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(shift - 3)}  }`;
};

const isSimplObj = ({ key, oldVal, newVal, type }) =>
  type !== 'hasChildren' && type !== 'changed' && (_.isObject(oldVal) || _.isObject(newVal));

const renderToString = (ast) => {
  const space = ' ';
  const doubleShift = 4;

  const result = (ast, shift) => {
    return ast.map((obj) => {
      const spaces = space.repeat(shift);
      const value = isSimplObj(obj) ? unwrapObject(obj, shift + doubleShift) : obj;

      switch (obj.type) {
        case 'hasChildren':
          return `${spaces}  ${obj.key}: {\n${result(obj.oldVal, shift + doubleShift)}\n${spaces}  }`;
        case 'unchanged':
          return `${spaces}  ${obj.key}: ${obj.oldVal}`;
        case 'changed':
          return `${spaces}+ ${obj.key}: ${obj.newVal}\n${spaces}- ${obj.key}: ${obj.oldVal}`;
        case 'added':
          return `${spaces}+ ${obj.key}: ${obj.newVal}`;
        case 'deleted':
          return `${spaces}- ${obj.key}: ${obj.oldVal}`;
        default:
          return null;
      }
    }).join('\n');
  };
  return `{\n${result(ast, 2)}\n}`;
};

export default renderToString;
