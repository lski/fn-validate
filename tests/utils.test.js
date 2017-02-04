var escape = require('../utils/regex-escape');
var isString = require('../utils/is-string');

test('escaping regex', () => {

    let regex = new RegExp("[" + escape("[") + "]");
    let result = regex.test("[");

    expect(result).toBe(true);
});

test('isString', () => {

    expect(isString("")).toBe(true);
    expect(isString(" fsdf sdfds ")).toBe(true);
    expect(isString(new String(0))).toBe(true);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(1.9)).toBe(false);
    expect(isString(true)).toBe(false);
});