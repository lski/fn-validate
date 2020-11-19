import { isString } from './utils/is-string';

/**
 * Checks a string is not longer longer than the number stated
 *
 * @param {number} maxLength
 * @param {string=} message
 */
export const maxLength = (maxLength, message = 'Too long') => {
	return (val) => {
		return isString(val) && val.length > maxLength ? [message] : [];
	};
};
