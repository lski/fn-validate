export const greaterThan = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val > minValue ? [] : [message];
	};
};
