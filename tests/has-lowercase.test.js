const validator = require('../has-lowercase');

test('has a lowercase letter', () => { 

    let lower = validator();

    let result = lower('thishasalowercaseSD33fd&');

    expect(result.length).toBe(0);
});

test('has no lowercase letter', () => { 

    let lower = validator();

    let result = lower('GSJDKK()&^%$&');

    expect(result.length).toBe(1);
});