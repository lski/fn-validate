import { isString } from './utils/is-string';

export const lengthBetween = (
	minLength,
	maxLength,
	message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length'
) => {
	return (val) => {
		return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
	};
};
