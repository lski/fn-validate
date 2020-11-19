/**
 * Checks a value is not 'falsy', considered invalid if it is.
 *
 * @param {string=} message
 */
export const required = (message = 'Required') => {
	return (val) => {
		return val ? [] : [message];
	};
};
