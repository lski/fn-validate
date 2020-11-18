import { isString } from './utils/is-string';

export const minLength = (minLength, message = 'Not long enough') => {
	return (val) => {
		return isString(val) && val.length < minLength ? [message] : [];
	};
};
