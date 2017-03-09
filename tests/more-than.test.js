const moreThan = require('../more-than');
const moreThanOrEqualTo = require('../more-than-or-equal-to');

test('More than tests', () => {

    let validator = moreThan(10);

    expect(validator(15).length).toBe(0);
    expect(validator(10).length).toBeGreaterThan(0);
    expect(validator(5).length).toBeGreaterThan(0);
});

test('More than or equal tests', () => {

    let validator = moreThanOrEqualTo(10);

    expect(validator(15).length).toBe(0);
    expect(validator(10).length).toBe(0);
    expect(validator(5).length).toBeGreaterThan(0);
});