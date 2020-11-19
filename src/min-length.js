import { isString } from './utils/is-string';

/**
 * Checks a string is than the number stated
 *
 * @param {number} minLength
 * @param {string=} message
 */
export const minLength = (minLength, message = 'Not long enough') => {
	return (val) => {
		return isString(val) && val.length < minLength ? [message] : [];
	};
};
