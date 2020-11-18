import { required } from '../src';

test('require no errors with string value', () => {

    var req = required();

    expect(req('a value').length).toBe(0);
});

test('require returns errors with empty string value', () => {

    var req = required();

    expect(req('').length).toBeGreaterThan(0);
});

test('require returns custom message on error', () => {

    var req = required('Bespoke message');
    var result = req(null);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Bespoke message');
});