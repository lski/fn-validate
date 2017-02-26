const validator = require('../has-character');

test('contains character', () => {

    var contains = validator("&^\\(*)");

    expect(contains('ddsfsdf').length).toBe(1);
    expect(contains('Afghsy').length).toBe(1);
    expect(contains('asdasdKJLK98789').length).toBe(1);
    expect(contains('asdasdKJLKA&*98789').length).toBe(0);
    expect(contains('&*').length).toBe(0);
    expect(contains('[]\\*').length).toBe(0);
});