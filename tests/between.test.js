const between = require('../validators/between');

test('Number is valid', () => {

    var between3and5 = between(3,5);
    var result = between3and5(4);

    expect(result.length).toBe(0);
});

test('Number too low', () => {

    var between3and5 = between(3,5);
    var result = between3and5(2);

    expect(result.length).toBeGreaterThan(0);
});

test('Number too high', () => {

    var between3and5 = between(3,5);
    var result = between3and5(6);

    expect(result.length).toBeGreaterThan(0);
});

test('String number converts correctly', () => {

    var between3and5 = between(3,5);
    var result = between3and5("4");

    expect(result.length).toBe(0);
});

test('Invalid types ignored', () => {

    var between3and5 = between(3,5);

    expect(between3and5("blah").length).toBe(0);
    expect(between3and5(true).length).toBe(0);
    expect(between3and5(false).length).toBe(0);
    expect(between3and5({}).length).toBe(0);
    expect(between3and5([]).length).toBe(0);
    expect(between3and5(new Date()).length).toBe(0);
});