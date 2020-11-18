import { isString } from './utils/is-string';

export const hasLowercase = (message = 'Requires a lowercase character') => {
	var reg = /[a-z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
