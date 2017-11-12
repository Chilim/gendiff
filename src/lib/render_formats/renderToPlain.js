const renderToPlain = (ast, root = '') => {
  const result = ast.map((obj) => {
    const property = (root === '') ? `${obj.key}` : `${root}.${obj.key}`;
    if (obj.operation === 'changed') {
      return `Property ${property} was updated. From ${obj.secondVal} to ${obj.firstVal}`;
    }
    if (obj.operation === 'deleted') {
      return `Property ${property} was removed`;
    }
    if (obj.operation === 'added') {
      const value = obj.children.length ? 'complex value' : `value: ${obj.secondVal}`;
      return `Property ${property} was added with ${value}`;
    }
    if (obj.children.length) {
      return `${renderToPlain(obj.children, property)}`;
    }
    return null;
  });
  return result.filter(item => item !== null).join('\n');
};

export default renderToPlain;
