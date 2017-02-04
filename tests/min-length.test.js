const minLength = require('../validators/min-length');

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

test('value is not a string', () => {

    expect(() => {

        var validator = minLength(3);
        var result = validator(true);

    }).toThrow();
});