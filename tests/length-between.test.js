const between = require('../validators/length-between');

test('length is valid', () => {

    let between3and10 = between(3, 10);
    let result = between3and10("dasdasd");

    expect(result.length).toBe(0);
});

test('length too short', () => {

    let between3and10 = between(3, 10);
    let result = between3and10("da");

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Should be between 3 and 10');
});

test('length too long', () => {

    let between3and10 = between(3, 10);
    let result = between3and10("dafasfsdfaskffsdfasdf");

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Should be between 3 and 10');
});