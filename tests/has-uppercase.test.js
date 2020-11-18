import { hasUppercase as hasUppercase } from '../src';

test('has a uppercase letter', () => {

    let upper = hasUppercase();

    let result = upper('thishasalowercaseSD33fd&');

    expect(result.length).toBe(0);
});

test('has no uppercase letter', () => {

    let upper = hasUppercase();

    let result = upper('sadasd23459kjsdlf()*09890');

    expect(result.length).toBe(1);
});