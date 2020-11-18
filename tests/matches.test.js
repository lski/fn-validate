import { matches } from '../src';

test('matches to match string regex', () => {
	var validator = matches('[abc]');
	var result = validator('a');

	expect(result.length).toBe(0);
});

test('matches to match RegExp regex', () => {
	var validator = matches(/[abc]/g);
	var result = validator('a');

	expect(result.length).toBe(0);
});

test('matches doesnt match string regex', () => {
	var validator = matches('[abc]');
	var result = validator('z');

	expect(result.length).toBeGreaterThan(0);
});

test('matches doesnt match RegExp regex', () => {
	var validator = matches(/[abc]/g);
	var result = validator('z');

	expect(result.length).toBeGreaterThan(0);
});
