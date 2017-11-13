import _ from 'lodash';

const unwrapObject = (obj, space) => Object.keys(obj).map(key =>
  `{\n${' '.repeat(space + 2)}${key}: ${obj[key]}\n ${' '.repeat(space - 3)}}`);

const isSimpObj = (type, value) =>
  type !== 'hasChildren' && type !== 'changed' && _.isObject(value);

const renderToString = (ast, shift = 2) => {
  const space = ' ';
  const doubleShift = 4;
  const spaces = space.repeat(shift);
  const result = ast.map((obj) => {
    const newValue = isSimpObj(obj.type, obj.value) ? unwrapObject(obj.value, shift + doubleShift) :
      obj.value;
    switch (obj.type) {
      case 'hasChildren':
        return `${spaces}  ${obj.key}: {\n${renderToString(obj.value, shift + doubleShift)}\n${spaces}  }\n`;
      case 'unchanged':
        return `${spaces}  ${obj.key}: ${newValue}\n`;
      case 'changed':
        return `${spaces}+ ${obj.key}: ${newValue.newVal}\n${spaces}- ${obj.key}: ${newValue.oldVal}\n`;
      case 'added':
        return `${spaces}+ ${obj.key}: ${newValue}\n`;
      case 'deleted':
        return `${spaces}- ${obj.key}: ${newValue}\n`;
      default:
        return null;
    }
  });
  result.join('');
  return `{\n${result.join('')}`;
};

export default renderToString;
