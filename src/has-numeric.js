import { isString } from './utils/is-string';

export const hasNumeric = (message = 'Requires a number') => {
	var reg = /\d/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
