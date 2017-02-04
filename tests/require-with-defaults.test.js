const requireValidator = require('../validators/require-with-defaults');

test('require no errors with single default', () => {

    var req = requireValidator('aDefaultValue');

    expect(req('a value').length).toBe(0);
});

test('require no errors with multiple defaults', () => {

    var req = requireValidator(['aDefaultValue', null]);

    expect(req('a value').length).toBe(0);
});

test('require with errors with single default', () => {

    var req = requireValidator('aDefaultValue');

    expect(req('aDefaultValue').length).toBeGreaterThan(0);
});

test('require with errors with multiple defaults', () => {

    var req = requireValidator(['aDefaultValue', null]);

    expect(req(null).length).toBeGreaterThan(0);
});

test('require returns custom message on error', () => {

    var req = requireValidator(null, 'Bespoke message');
    var result = req(null);        

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Bespoke message');
});