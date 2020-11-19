/**
 * Checks value is less than or equal to a supplied value.
 *
 * @param {number} maxValue
 * @param {string=} message
 */
export const lessThanOrEqualTo = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val <= maxValue ? [] : [message];
	};
};
