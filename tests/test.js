import genDiff from '../src';

test('compare ini', () => {
  expect(genDiff('tests/fixtures/before.json', 'tests/fixtures/after.json')).toBe(`{
    host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
}`);
});
