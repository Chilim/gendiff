import _ from 'lodash';

const hasComplexValue = (type, obj) => type !== 'hasChild' && type !== 'changed' && (_.isObject(obj.oldValue) || _.isObject(obj.newValue));

const renderToPlain = (ast, root = '') => {
  const result = ast.map((obj) => {
    const property = (root === '') ? `${obj.key}` : `${root}.${obj.key}`;
    const isComplexValue = hasComplexValue(obj.type, obj);
    switch (obj.type) {
      case 'hasChild':
         return `${renderToPlain(obj.children, property)}`;
      case 'changed':
        return `Property '${property}' was updated. From '${obj.newValue}' to '${obj.oldValue}'`;
      case 'added':
        return `Property '${property}' was added with ${ isComplexValue ? 'complex value' :  `value: ${obj.newValue}`}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      default:
        return null;
    }
  });
  return result.filter(el => el !== null).join('\n');
};
export default renderToPlain;
