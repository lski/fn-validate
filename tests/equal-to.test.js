const validator = require('../equal-to');

test('via func', () => {

    var req = validator(() => 10);

    expect(req(10).length).toBe(0);
    expect(req(1).length).toBe(1);
});

test('via value', () => {

    var req = validator(10);

    expect(req(10).length).toBe(0);
    expect(req(1).length).toBe(1);
});