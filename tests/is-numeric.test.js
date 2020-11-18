import { isNumeric } from '../src';

test('Is a number', () => {

    var validator = isNumeric();

    expect(validator(10).length).toBe(0);
    expect(validator("10").length).toBe(0);
});

test('Is NOT a number', () => {

    var validator = isNumeric();

    expect(validator("blah").length).toBeGreaterThan(0);
    expect(validator({}).length).toBeGreaterThan(0);
    expect(validator(function() {}).length).toBeGreaterThan(0);
    expect(validator(new Date()).length).toBeGreaterThan(0);
    expect(validator(true).length).toBeGreaterThan(0);
});