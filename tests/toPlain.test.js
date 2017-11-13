const genDiff = require('../src');

describe('genDiff', () => {
  const expected =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

  test('generate plain format output from .json files', () => {
    const path1 = 'tests/fixtures/before2.json';
    const path2 = 'tests/fixtures/after2.json';
    const actual = genDiff(path1, path2, 'plain');
    expect(actual).toBe(expected);
  });

  test('generate plain format output from .yaml files', () => {
    const path1 = 'tests/fixtures/before2.yaml';
    const path2 = 'tests/fixtures/after2.yaml';
    const actual = genDiff(path1, path2, 'plain');
    expect(actual).toBe(expected);
  });

  test('generate plain format output from .ini files', () => {
    const path1 = 'tests/fixtures/before2.ini';
    const path2 = 'tests/fixtures/after2.ini';
    const actual = genDiff(path1, path2, 'plain');
    expect(actual).toBe(expected);
  });
});
