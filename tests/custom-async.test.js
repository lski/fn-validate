import { customAsync } from '../src';

test('is true - async', () => {
	let validator = customAsync((val) => Promise.resolve(val));
	let result = validator(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});

test('is false - async', () => {
	let validator = customAsync((val) => Promise.resolve(val));
	let result = validator(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThan(0);
	});
});

test('is true', () => {
	let validator = customAsync((val) => val);
	let result = validator(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});

test('is false', () => {
	let validator = customAsync((val) => val);
	let result = validator(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBeGreaterThan(0);
	});
});
