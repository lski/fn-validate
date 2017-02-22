const validator = require('../has-uppercase');

test('has a uppercase letter', () => { 

    let upper = validator();

    let result = upper('thishasalowercaseSD33fd&');

    expect(result.length).toBe(0);
});

test('has no uppercase letter', () => { 

    let upper = validator();

    let result = upper('sadasd23459kjsdlf()*09890');

    expect(result.length).toBe(1);
});