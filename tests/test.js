import genDiff from '../src';

describe('gendiff', () => {
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  test('compare jsom files', () => {
    const path1 = 'tests/fixtures/config1.json';
    const path2 = 'tests/fixtures/config2.json';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });

  test('ompare yaml files', () => {
    const path1 = 'tests/fixtures/config1.yml';
    const path2 = 'tests/fixtures/config2.yml';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });
});
