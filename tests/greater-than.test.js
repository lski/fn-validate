import { greaterThan, greaterThanOrEqualTo } from '../src';

test('More than tests', () => {
	let validator = greaterThan(10);

	expect(validator(15).length).toBe(0);
	expect(validator(10).length).toBeGreaterThan(0);
	expect(validator(5).length).toBeGreaterThan(0);
});

test('More than or equal tests', () => {
	let validator = greaterThanOrEqualTo(10);

	expect(validator(15).length).toBe(0);
	expect(validator(10).length).toBe(0);
	expect(validator(5).length).toBeGreaterThan(0);
});
