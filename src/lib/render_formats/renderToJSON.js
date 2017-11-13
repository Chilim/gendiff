const renderToJSON = (ast) => {
  const result = tree => tree.reduce((acc, obj) => {
    const { key, type, value } = obj;
    return (type === 'hasChildren') ? { ...acc, [key]: { type, value: result(value) } }
      : { ...acc, [key]: { type, value } };
  }, {});
  return JSON.stringify(result(ast), null, 2);
};

export default renderToJSON;
