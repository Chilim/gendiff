import genDiff from '../src';

describe('genDiff', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  test('compare .json files', () => {
    const path1 = 'tests/fixtures/before.json';
    const path2 = 'tests/fixtures/after.json';
    const actual = genDiff(path1, path2, 'casual');
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
    const actual = genDiff(path1, path2, 'casual');
    expect(actual).toBe(expected);
  });
  test('compare .yaml files with recursion', () => {
    const path1 = 'tests/fixtures/before2.yaml';
    const path2 = 'tests/fixtures/after2.yaml';
    const actual = genDiff(path1, path2, 'casual');
    expect(actual).toBe(expected);
  });
  test('compare .ini files with recursion', () => {
    const path1 = 'tests/fixtures/before2.ini';
    const path2 = 'tests/fixtures/after2.ini';
    const actual = genDiff(path1, path2, 'casual');
    expect(actual).toBe(expected);
  });
});
