import genDiff from '../src';

describe('genDiff', () => {
  const expected = '{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}';
  test('compare .json files', () => {
    const path1 = 'tests/fixtures/before.json';
    const path2 = 'tests/fixtures/after.json';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });

  test('compare .yaml files', () => {
    const path1 = 'tests/fixtures/before.yml';
    const path2 = 'tests/fixtures/after.yml';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });

  test('compare .ini files', () => {
    const path1 = 'tests/fixtures/before.ini';
    const path2 = 'tests/fixtures/after.ini';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });
});
