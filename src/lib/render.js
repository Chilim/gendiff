const space = '  ';

const render = (ast, shift = 1) => {
  const doubleShift = space.repeat(shift);
  const newShift = shift + 2;
  const result = ast.map((obj) => {
    if (obj.operation === 'draw') {
      if (!obj.children.length) {
        return `${doubleShift}  ${obj.key}: ${obj.secondVal}\n`;
      }
      return `${doubleShift} ${obj.key}: ${render(obj.children, newShift)}\n`;
    }
    if (obj.operation === 'changed') {
      if (!obj.children.length) {
        return `${doubleShift}+ ${obj.key}: ${obj.secondVal}\n${doubleShift}- ${obj.key}: ${obj.firstVal}\n`;
      }
      return `${doubleShift}+ ${obj.key}: ${render(obj.children, newShift)}\n`;
    }
    if (obj.operation === 'deleted') {
      if (!obj.children.length) {
        return `${doubleShift}- ${obj.key}: ${obj.firstVal}\n`;
      }
      return `${doubleShift}- ${obj.key}: ${render(obj.children, newShift)}\n`;
    }
    if (obj.operation === 'added') {
      if (!obj.children.length) {
        return `${doubleShift}+ ${obj.key}: ${obj.secondVal}\n`;
      }
      return `${doubleShift}+ ${obj.key}: ${render(obj.children, newShift)}\n`;
    }
    return 'No combinations is match';
  });
  return `{\n${result.join('')} }`;
};

export default render;
