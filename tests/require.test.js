const requireValidator = require('../validators/require');

test('require no errors with string value', () => {

    var req = requireValidator();

    expect(req('a value').length).toBe(0);
});

test('require returns errors with empty string value', () => {

    var req = requireValidator();

    expect(req('').length).toBeGreaterThan(0);
});

test('require returns custom message on error', () => {

    var req = requireValidator('Bespoke message');
    var result = req(null);        

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Bespoke message');
});