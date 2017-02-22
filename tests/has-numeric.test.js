const validator = require('../has-numeric');

test('has a number', () => { 

    let numeric = validator();

    let result = numeric('thishasalowercaseSD33fd&');

    expect(result.length).toBe(0);
});

test('has no number', () => { 

    let numeric = validator();

    let result = numeric('SJJKJkdsdfkj*&(*^*)');

    expect(result.length).toBe(1);
});