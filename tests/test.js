import genDiff from '../src';

const firstFilePath = './__tests__/fixtures/before.json';
const secondFilePath = './__tests__/fixtures/after.json';

const actual = genDiff(firstFilePath, secondFilePath);
const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compare result and exprected values', () => {
  expect(actual).toBe(expected);
});
