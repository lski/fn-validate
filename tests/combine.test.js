const combine = require('../combine');
const requireValidator = require('../required');

test('combining reducers no error', () => { 

    let reqA = requireValidator();
    let reqB = requireValidator('Second validator');
    let combined = combine([reqA, reqB]);
    let result = combined('a value');

    expect(result.length).toBe(0);
});

test('combining reducers with error', () => { 

    let reqA = requireValidator();
    let reqB = requireValidator('Second validator');
    let combined = combine([reqA, reqB]);
    let result = combined(null);

    expect(result.length).toBe(2);
    expect(result).toContain('Second validator');
});