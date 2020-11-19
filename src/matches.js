import { isString } from './utils/is-string';

/**
 * Checks a value matches a regexp pattern
 *
 * @param {string|RegExp} regex Pattern to match value against
 * @param {*} message
 */
export const matches = (regex, message = 'Value doesnt match pattern') => {
	regex = isString(regex) ? new RegExp(regex) : regex;

	return (val) => {
		return regex.test(val) ? [] : [message];
	};
};
