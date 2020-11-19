/**
 * Checks value is greater than or equal to a supplied value.
 *
 * @param {number} minValue
 * @param {string=} message
 */
export const greaterThanOrEqualTo = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val >= minValue ? [] : [message];
	};
};
