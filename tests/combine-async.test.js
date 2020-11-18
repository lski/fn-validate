import { custom, customAsync, combineAsync } from '../src';

test('First error - No Fail - All async', async () => {
	let validators = combineAsync([
		customAsync((val) => Promise.resolve(val), 'First'),
		customAsync((val) => Promise.resolve(val), 'second'),
	]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});

test('First error - All Fail - All async', async () => {
	let validators = combineAsync([
		customAsync((val) => Promise.resolve(val), 'First'),
		customAsync((val) => Promise.resolve(val), 'Second'),
	]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail - All Async', async () => {
	let validators = combineAsync([
		customAsync((val) => Promise.resolve(!val), 'First'),
		customAsync((val) => Promise.resolve(val), 'Second'),
	]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('All errors - All Fail - All Async', async () => {
	let validators = combineAsync(
		[customAsync((val) => Promise.resolve(val), 'First'), customAsync((val) => Promise.resolve(val), 'Second')],
		true
	);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(2);
	});
});

test('First error - No Fail - Mixed async (sync first)', async () => {
	let validators = combineAsync([custom((val) => val, 'First'), customAsync((val) => Promise.resolve(val), 'Second')]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});

test('First error - All false - Mixed async (sync first)', async () => {
	let validators = combineAsync([custom((val) => val, 'First'), customAsync((val) => Promise.resolve(val), 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - All true - Mixed async (sync second)', async () => {
	let validators = combineAsync([customAsync((val) => Promise.resolve(val), 'First'), custom((val) => val, 'Second')]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});

test('First error - All false - Mixed async (sync second)', async () => {
	let validators = combineAsync([customAsync((val) => Promise.resolve(val), 'First'), custom((val) => val, 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail - Mixed async (sync first)', async () => {
	let validators = combineAsync([custom((val) => !val, 'First'), customAsync((val) => Promise.resolve(val), 'Second')]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail (reversed) - Mixed async (sync first)', async () => {
	let validators = combineAsync([custom((val) => val, 'First'), customAsync((val) => Promise.resolve(!val), 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail - Mixed async (sync second)', async () => {
	let validators = combineAsync([customAsync((val) => Promise.resolve(!val), 'First'), custom((val) => val, 'Second')]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail (reversed) - Mixed async (sync second)', async () => {
	let validators = combineAsync([customAsync((val) => Promise.resolve(val), 'First'), custom((val) => !val, 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail - Sync', async () => {
	let validators = combineAsync([custom((val) => !val, 'First'), custom((val) => val, 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - One Fail (reversed) - Sync', async () => {
	let validators = combineAsync([custom((val) => val, 'First'), custom((val) => !val, 'Second')]);

	let result = validators(false);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(1);
	});
});

test('First error - No Fail - Sync', async () => {
	let validators = combineAsync([custom((val) => val, 'First'), custom((val) => val, 'Second')]);

	let result = validators(true);

	expect(result).toBeInstanceOf(Promise);

	return result.then((result) => {
		expect(result).toBeInstanceOf(Array);
		expect(result.length).toBe(0);
	});
});
