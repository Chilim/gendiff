import genDiff from '../src';

describe('genDiff', () => {
  const expected =
  `{
  "common": {
    "type": "hasChild",
    "value": {
      "setting1": {
        "type": "unchanged",
        "oldValue": "Value 1",
        "newValue": "Value 1"
      },
      "setting2": {
        "type": "deleted",
        "oldValue": "200"
      },
      "setting3": {
        "type": "unchanged",
        "oldValue": true,
        "newValue": true
      },
      "setting6": {
        "type": "deleted",
        "oldValue": {
          "key": "value"
        }
      },
      "setting4": {
        "type": "added",
        "newValue": "blah blah"
      },
      "setting5": {
        "type": "added",
        "newValue": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "type": "hasChild",
    "value": {
      "baz": {
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      "foo": {
        "type": "unchanged",
        "oldValue": "bar",
        "newValue": "bar"
      }
    }
  },
  "group2": {
    "type": "deleted",
    "oldValue": {
      "abc": "12345"
    }
  },
  "group3": {
    "type": "added",
    "newValue": {
      "fee": "100500"
    }
  }
}`;

  test('generate json format output from .json files', () => {
    const path1 = 'tests/fixtures/before2.json';
    const path2 = 'tests/fixtures/after2.json';
    const actual = genDiff(path1, path2, 'json');
    expect(actual).toBe(expected);
  });

  test('generate json format output from .json files', () => {
    const path1 = 'tests/fixtures/before2.json';
    const path2 = 'tests/fixtures/after2.json';
    const actual = genDiff(path1, path2, 'json');
    expect(actual).toBe(expected);
  });

  test('generate json format output from .json files', () => {
    const path1 = 'tests/fixtures/before2.json';
    const path2 = 'tests/fixtures/after2.json';
    const actual = genDiff(path1, path2, 'json');
    expect(actual).toBe(expected);
  });
});
