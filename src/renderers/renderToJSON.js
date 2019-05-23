const renderToJSON = (ast) => {
  const result = tree => tree.reduce((acc, obj) => {
    const { key, type, oldValue, newValue, children } = obj;
    return (type === 'hasChild') ? { ...acc, [key]: { type, value: result(children) } }
      : { ...acc, [key]: { type, oldValue, newValue } };
  }, {});
  return JSON.stringify(result(ast), null, 2);
};

export default renderToJSON;
