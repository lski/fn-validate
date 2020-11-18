export const required = (message = 'This is required') => {
	return (val) => {
		return val ? [] : [message];
	};
};
