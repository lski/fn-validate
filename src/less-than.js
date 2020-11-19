/**
 * Checks value is less than a supplied value.
 *
 * @param {number} maxValue
 * @param {string=} message
 */
export const lessThan = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val < maxValue ? [] : [message];
	};
};
