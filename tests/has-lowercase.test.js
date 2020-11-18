import { hasLowercase } from '../src';

test('has a lowercase letter', () => {

    let lower = hasLowercase();

    let result = lower('thishasalowercaseSD33fd&');

    expect(result.length).toBe(0);
});

test('has no lowercase letter', () => {

    let lower = hasLowercase();

    let result = lower('GSJDKK()&^%$&');

    expect(result.length).toBe(1);
});