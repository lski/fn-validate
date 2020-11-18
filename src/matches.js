import { isString } from './utils/is-string';

export const matches = (regex, message = 'Value doesnt match pattern') => {
	regex = isString(regex) ? new RegExp(regex) : regex;

	return (val) => {
		return regex.test(val) ? [] : [message];
	};
};
