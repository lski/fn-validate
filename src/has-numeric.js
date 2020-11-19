import { isString } from './utils/is-string';

/**
 * Checks a value has at least one numeric character
 *
 * @param {string=} message
 */
export const hasNumeric = (message = 'Requires a number') => {
	var reg = /\d/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
