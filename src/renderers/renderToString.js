import _ from 'lodash';

const stringify = (oldVal, newVal, ident) => {
  const obj = _.isObject(oldVal) ? oldVal : newVal;
  const str = _.keys(obj).map(key => `${' '.repeat(ident)}  ${key}: ${obj[key]}`).join('\n');
  return `{\n${str}\n${' '.repeat(ident - 2)} }`;
};

const isSimplObj = ({ oldValue, newValue, type }) =>
  type !== 'hasChild' && type !== 'changed' && (_.isObject(oldValue) || _.isObject(newValue));

const renderToTree = (ast) => {
  const space = ' ';
  const doubleShift = 4;

  const result = (nodes, ident) => nodes.map((node) => {
    const spaces = ' '.repeat(ident);
    const doubleIdent = 4;
    const { key, type, oldValue, newValue, children } = node;
    const value = isSimplObj(node) ? stringify(oldValue, newValue, ident + doubleIdent) : node;
    switch (type) {
    case 'hasChild':
      return `${spaces}  ${key}: {\n${result(children, ident + doubleIdent)}\n${spaces}  }`;
    case 'unchanged':
      return `${spaces}  ${key}: ${newValue}`;
    case 'changed':
      return `${spaces}+ ${key}: ${newValue}\n${spaces}- ${key}: ${oldValue}`;
    case 'added':
      return `${spaces}+ ${key}: ${_.isObject(newValue) ? value : newValue}`;
    case 'deleted':
      return `${spaces}- ${key}: ${_.isObject(oldValue) ? value : oldValue}`;
    default:
      return null;
    }
  }).join('\n');
  return `{\n${result(ast, 2)}\n}`;
};

export default renderToTree;
