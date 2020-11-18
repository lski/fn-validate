import { allowedChars as validator } from '../src/allowed-chars';

test('only lower', () => {

    var only = validator(true, false, false);

    expect(only('ddsfsdf').length).toBe(0);
    expect(only('Afghsy').length).toBe(1);
    expect(only('KJLKA&*98789').length).toBe(1);
});

test('only upper', () => {

    var only = validator(false, true, false);

    expect(only('JHJSJH').length).toBe(0);
    expect(only('Afghsy').length).toBe(1);
    expect(only('dsfdsdf&*98789').length).toBe(1);
});

test('only numeric', () => {

    var only = validator(false, false, true);

    expect(only('345345').length).toBe(0);
    expect(only('Afghsy').length).toBe(1);
    expect(only('dsfdsdf&*').length).toBe(1);
});

test('only lower and upper', () => {

    var only = validator(true, true, false);

    expect(only('ddsfsdf').length).toBe(0);
    expect(only('Afghsy').length).toBe(0);
    expect(only('asdasdKJLKA&*98789').length).toBe(1);
});

test('lower and upper and numeric', () => {

    var only = validator(true, true, true);

    expect(only('ddsfsdf').length).toBe(0);
    expect(only('Afghsy').length).toBe(0);
    expect(only('asdasdKJLK98789').length).toBe(0);
    expect(only('asdasdKJLKA&*98789').length).toBe(1);
});

test('symbols', () => {

    var only = validator(false, false, false, "&^\\(*)");

    expect(only('ddsfsdf').length).toBe(1);
    expect(only('Afghsy').length).toBe(1);
    expect(only('asdasdKJLK98789').length).toBe(1);
    expect(only('asdasdKJLKA&*98789').length).toBe(1);
    expect(only('&*').length).toBe(0);
    expect(only('&\\*').length).toBe(0);
});