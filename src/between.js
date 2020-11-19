import { isNumber } from './utils/is-number';

/**
 * Checks a number is between two values (inclusively)
 *
 * @param {number} min
 * @param {number} max
 * @param {string=} message
 */
export const between = (min, max, message = 'Should be between ' + min + ' and ' + max) => {
	return (val) => {
		let parsed = isNumber(val) ? val : parseFloat(val);

		return !Number.isNaN(parsed) && (val < min || val > max) ? [message] : [];
	};
};
