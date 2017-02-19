const password = require('../password');

test('password enforce all success', () => {

    let validator = password(1, 100, "&-\\/", true, true, true, true);
    let result = validator("ahdj0A-&")

    expect(result.length).toBe(0);
});

test('password enforce length fail', () => {

    let validator = password(10, 100);
    let result = validator("ahdj0A-&")

    expect(result.length).toBeGreaterThan(0);
});

test('password enforce number fail', () => {

    let validator = password(10, 100, null, true, false, false, false);
    let result = validator("asdsdkksdaksdad")

    expect(result.length).toBeGreaterThan(0);
});

test('password enforce lowercase fail', () => {

    let validator = password(10, 100, null, false, true, false, false);
    let result = validator("DGJJCKD0SKKDXLX9");

    expect(result.length).toBeGreaterThan(0);
});

test('password enforce uppercase fail', () => {

    let validator = password(10, 100, null, false, false, true, false);
    let result = validator("asdsdkks093daksdad");

    expect(result.length).toBeGreaterThan(0);
});

test('password enforce invalid character fail', () => {

    let validator = password(10, 100, null, false, false, false, false);
    let result = validator("asdsdkks093da-0-sd)d");

    expect(result.length).toBeGreaterThan(0);
});