
const isSimpObj = (type, value) => type !== 'hasChildren' && type !== 'changed' && value instanceof Object;

const renderToPlain = (ast, root = '') => {
  const result = ast.map((obj) => {
    const property = (root === '') ? `${obj.key}` : `${root}.${obj.key}`;
    const newValue = isSimpObj(obj.type, obj.value) ? 'complex value' : obj.value;
    switch (obj.type) {
      case 'hasChildren':
        return `${renderToPlain(obj.value, property)}`;
      case 'changed':
        return `Property '${property}' was updated. From '${newValue.secondVal}' to '${newValue.firstVal}'`;
      case 'added':
        return `Property '${property}' was added with ${(newValue === 'complex value') ? newValue :
          `value: ${newValue}`}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      default:
        return null;
    }
  });
  return result.filter(el => el !== null).join('\n');
};

export default renderToPlain;
