import { isString } from './utils/is-string';

export const maxLength = (maxLength, message = 'Too long') => {
	return (val) => {
		return isString(val) && val.length > maxLength ? [message] : [];
	};
};
