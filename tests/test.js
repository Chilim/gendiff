import fs from 'fs';
import genDiff from '../src';

const firstFilePath = fs.readFileSync('tests/testfiles/before.js', 'utf8');
const secondFilePath = fs.readFileSync('tests/testfiles/after.js', 'utf8');

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
