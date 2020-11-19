import { isString } from './utils/is-string';

/**
 * Checks a value has at least one lowercase character
 *
 * NB: Currently English alphabet characters only
 *
 * @param {string=} message
 */
export const hasLowercase = (message = 'Requires a lowercase character') => {
	var reg = /[a-z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
