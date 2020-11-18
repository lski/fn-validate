import { matches } from './matches';
import { regexEscape } from './utils/regex-escape';

/**
 *
 *
 * @param {boolean=} lowercase
 * @param {boolean=} uppercase
 * @param {boolean=} numeric
 * @param {?string=} allowedSymbols
 * @param {string=} message The error message to display
 */
export const allowedChars = (
	lowercase = true,
	uppercase = true,
	numeric = true,
	allowedSymbols = '',
	message = 'Value contains restricted characters'
) => {
	let regexBuilder = '^[';

	if (lowercase) {
		regexBuilder += 'a-z';
	}

	if (uppercase) {
		regexBuilder += 'A-Z';
	}

	if (numeric) {
		regexBuilder += '0-9';
	}

	if (allowedSymbols) {
		regexBuilder += regexEscape(allowedSymbols);
	}

	regexBuilder += ']*$';

	return matches(new RegExp(regexBuilder), message);
};
