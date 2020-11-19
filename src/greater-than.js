/**
 * Checks value is greater than a supplied value
 *
 * @param {number} minValue
 * @param {string=} message
 */
export const greaterThan = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val > minValue ? [] : [message];
	};
};
