import { isString } from './utils/is-string';

export const hasUppercase = (message = 'Requires an uppercase character') => {
	var reg = /[A-Z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};
