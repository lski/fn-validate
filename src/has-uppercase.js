import { isString } from './utils/is-string';

/**
 * Checks a value has at least one uppercase character
 *
 * NB: Currently English alphabet characters only
 *
 * @param {string=} message
 */
export const hasUppercase = (message = 'Requires an uppercase character') => {
	var reg = /[A-Z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
