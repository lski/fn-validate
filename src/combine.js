import { isFunction } from './utils/is-func';

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 *
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
 */
export function combine(validators, runAll) {
	if (!Array.isArray(validators)) {
		throw new Error('combine requires that validators are an array of functions');
	}

	// handle an empty array of validators not causing errors
	if (validators.length === 0) {
		return () => [];
	}

	// check that validators passed in are functions
	for (let i = 0, end = validators.length; i < end; i++) {
		if (!isFunction(validators[i])) {
			throw new Error('Each validator needs to be a function');
		}
	}

	// No point in wrapping this function if only one
	if (validators.length === 1) {
		return validators;
	}

	if (runAll === true) {
		return (val) => validators.reduce((errors, validator) => errors.concat(validator(val)), []);
	}

	return (val) => {
		for (const validator of validators) {
			let result = validator(val);

			if (result.length > 0) {
				// If an error escape loop early
				return result;
			}
		}

		return [];
	};
}
