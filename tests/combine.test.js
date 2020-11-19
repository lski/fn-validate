import { combine, required } from '../src';

test('combining reducers no error', () => {
	let reqA = required();
	let reqB = required('Second validator');
	let combined = combine([reqA, reqB]);
	let result = combined('a value');

	expect(result.length).toBe(0);
});

test('combining reducers with only first error', () => {
	let reqA = required();
	let reqB = required('Second validator');
	let combined = combine([reqA, reqB]);
	let result = combined(null);

	expect(result.length).toBe(1);
	expect(result).toContain('Required');
});

test('combining reducers with all errors', () => {
	let reqA = required();
	let reqB = required('Second validator');
	let combined = combine([reqA, reqB], true);
	let result = combined(null);

	expect(result.length).toBe(2);
	expect(result).toContain('Second validator');
});
