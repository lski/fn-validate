import { maxLength } from '../src';

test('value is short enough', () => {

    var max4 = maxLength(4);
    var result = max4("abcd");

    expect(result.length).toBe(0);
});

test('value is too long', () => {

    var max3 = maxLength(3);
    var result = max3("abcd");

    expect(result.length).toBeGreaterThan(0);
});

test('value is not a string should not throw error', () => {

    var max3 = maxLength(3);

    expect(max3(true).length).toBe(0);
    expect(max3(1).length).toBe(0);
    expect(max3(false).length).toBe(0);
    expect(max3(0).length).toBe(0);
    expect(max3(undefined).length).toBe(0);
    expect(max3(null).length).toBe(0);
    expect(max3(new Date()).length).toBe(0);
    expect(max3([]).length).toBe(0);
    expect(max3(["a", "b", "c", "d"]).length).toBe(0);
    expect(max3({ length: 4 }).length).toBe(0);
});