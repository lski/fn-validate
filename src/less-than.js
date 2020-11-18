export const lessThan = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val < maxValue ? [] : [message];
	};
};
