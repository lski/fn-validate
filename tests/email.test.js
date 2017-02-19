const email = require('../email');

test('is email', () => {

    var validator = email();
    var result = validator('email@email.com');

    expect(result.length).toBe(0);
});

test('is not email', () => {

    var validator = email();
    var result = validator('blah@blah');

    expect(result.length).toBeGreaterThan(0);
});