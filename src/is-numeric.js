import { isNumber } from './utils/is-number';

export const isNumeric = (message = 'Value is not a valid number') => {
	return (val) => {
		if (isNumber(val)) {
			return [];
		}

		return isNaN(parseFloat(val)) ? [message] : [];
	};
};
