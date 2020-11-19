import { isNumber } from './utils/is-number';

/**
 * Checks if a value is a number or whether it can be converted to a number (via parseFloat)
 *
 * @param {string=} message
 */
export const isNumeric = (message = 'Value is not a valid number') => {
	return (val) => {
		if (isNumber(val)) {
			return [];
		}

		return isNaN(parseFloat(val)) ? [message] : [];
	};
};
