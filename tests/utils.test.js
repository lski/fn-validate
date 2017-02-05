const escape = require('../utils/regex-escape');
const isString = require('../utils/is-string');
const replace = require('../utils/replace-values');

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

test('replace-values', () => {

    let mess = 'a "{valueA}" to replace and another "{valueB}" to replace';
    let replacements = { valueA: "A", valueB: "B" };
    let output = replace(mess, replacements);

    expect(output).toBe('a "A" to replace and another "B" to replace');
});