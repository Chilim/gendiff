
const isSimplObj = (type, value) => type !== 'hasChildren' && type !== 'changed' && value instanceof Object;

const renderToPlain = (ast, root = '') => {
  const result = ast.map((obj) => {
    const property = (root === '') ? `${obj.key}` : `${root}.${obj.key}`;
    const CurrVal = isSimplObj(obj.type, obj.oldVal) ? 'complex value' : obj;
    switch (obj.type) {
      case 'hasChildren':
        return `${renderToPlain(obj.oldVal, property)}`;
      case 'changed':
        return `Property '${property}' was updated. From '${CurrVal.newVal}' to '${CurrVal.oldVal}'`;
      case 'added':
        return `Property '${property}' was added with ${(CurrVal === 'complex value') ? CurrVal :
          `value: ${CurrVal}`}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      default:
        return null;
    }
  });
  return result.filter(el => el !== null).join('\n');
};

export default renderToPlain;
