import genDiff from '../src';
// const genDiff = require('../src');

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

describe('Compares two Recursive files', () => {
  const expected =
`{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  test('compare .json files with recursion', () => {
    const path1 = 'tests/fixtures/before2.json';
    const path2 = 'tests/fixtures/after2.json';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });
  test('compare .yaml files with recursion', () => {
    const path1 = 'tests/fixtures/before2.yml';
    const path2 = 'tests/fixtures/after2.yml';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });
  test('compare .ini files with recursion', () => {
    const path1 = 'tests/fixtures/before2.ini';
    const path2 = 'tests/fixtures/after2.ini';
    const actual = genDiff(path1, path2);
    expect(actual).toBe(expected);
  });
});
