import { minLength } from '../src';

test('value is long enough', () => {

    var validator = minLength(4);
    var result = validator("abcd");

    expect(result.length).toBe(0);
});

test('value is not long enough', () => {

    var validator = minLength(5);
    var result = validator("abcd");

    expect(result.length).toBeGreaterThan(0);
});

test('value is not a string should not throw error', () => {

    var min3 = minLength(3);

    expect(min3(true).length).toBe(0);
    expect(min3(1).length).toBe(0);
    expect(min3(false).length).toBe(0);
    expect(min3(0).length).toBe(0);
    expect(min3(undefined).length).toBe(0);
    expect(min3(null).length).toBe(0);
    expect(min3(new Date()).length).toBe(0);
    expect(min3([]).length).toBe(0);
    expect(min3(["a","b","c","d"]).length).toBe(0);
});