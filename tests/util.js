export function customAsync(func, message) {
	return (val) => {
		return Promise.resolve(func(val) ? [] : [message]);
	};
}

export function custom(func, message) {
	return (val) => {
		return func(val) ? [] : [message];
	};
}