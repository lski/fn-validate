import { hasNumeric } from '../src';

test('has a number', () => {
	let numeric = hasNumeric();

	let result = numeric('thishasalowercaseSD33fd&');

	expect(result.length).toBe(0);
});

test('has no number', () => {
	let numeric = hasNumeric();

	let result = numeric('SJJKJkdsdfkj*&(*^*)');

	expect(result.length).toBe(1);
});
