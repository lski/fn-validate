import { lessThan, lessThanOrEqualTo } from '../src';

test('Less than tests', () => {
	let validator = lessThan(10);

	expect(validator(15).length).toBeGreaterThan(0);
	expect(validator(10).length).toBeGreaterThan(0);
	expect(validator(5).length).toBe(0);
});

test('Less than or equal tests', () => {
	let validator = lessThanOrEqualTo(10);

	expect(validator(15).length).toBeGreaterThan(0);
	expect(validator(10).length).toBe(0);
	expect(validator(5).length).toBe(0);
});
