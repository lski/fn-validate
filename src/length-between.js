import { isString } from './utils/is-string';

/**
 * Checks a string is between a minimum and maximum length (inclusive)
 *
 * @param {number} minLength
 * @param {number} maxLength
 * @param {string=} message
 */
export const lengthBetween = (
	minLength,
	maxLength,
	message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length'
) => {
	return (val) => {
		return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
	};
};
