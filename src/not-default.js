/**
 * Similar to required, checks a value against a default or list of default values to ensure its been changed.
 * Uses exact match (===) for comparison.
 *
 * @param {*|*[]} defaultValues A single value or list of values that are considered 'default' e.g. [0,'', 'false']
 * @param {string=} message
 */
export const notDefault = (defaultValues, message = 'This is required') => {
	defaultValues = Array.isArray(defaultValues) ? defaultValues : [defaultValues];

	return (val) => {
		for (let i = 0, n = defaultValues.length; i < n; i++) {
			if (val === defaultValues[i]) {
				return [message];
			}
		}

		// No match so return no error
		return [];
	};
};
