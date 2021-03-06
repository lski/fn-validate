import { hasChar } from '../src';

test('contains character', () => {
	var contains = hasChar('&^\\(*)');

	expect(contains('ddsfsdf').length).toBe(1);
	expect(contains('Afghsy').length).toBe(1);
	expect(contains('asdasdKJLK98789').length).toBe(1);
	expect(contains('asdasdKJLKA&*98789').length).toBe(0);
	expect(contains('&*').length).toBe(0);
	expect(contains('[]\\*').length).toBe(0);
});
