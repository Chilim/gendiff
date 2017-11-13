import genDiff from '../src';

describe('genDiff', () => {
  const expected =
  `{
  "common": {
    "type": "hasChildren",
    "value": {
      "setting1": {
        "type": "unchanged",
        "value": "Value 1"
      },
      "setting2": {
        "type": "deleted",
        "value": "200"
      },
      "setting3": {
        "type": "unchanged",
        "value": true
      },
      "setting6": {
        "type": "deleted",
        "value": {
          "key": "value"
        }
      },
      "setting4": {
        "type": "added",
        "value": "blah blah"
      },
      "setting5": {
        "type": "added",
        "value": {
          "key5": "value5"
        }
      }
    }
  },
  "group1": {
    "type": "hasChildren",
    "value": {
      "baz": {
        "type": "changed",
        "value": {
          "oldVal": "bas",
          "newVal": "bars"
        }
      },
      "foo": {
        "type": "unchanged",
        "value": "bar"
      }
    }
  },
  "group2": {
    "type": "deleted",
    "value": {
      "abc": "12345"
    }
  },
  "group3": {
    "type": "added",
    "value": {
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
