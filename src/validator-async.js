import { isPromise } from './utils/is-promise';
import { isFunction } from './utils/is-func';

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run.
 *
 * @param {func} func
 * @param {string} message
 */
export function validatorAsync(message, func) {
	if (!isFunction(func)) {
		throw new Error('func needs to be a function');
	}

	return (val) => {
		const result = func(val);

		return isPromise(result)
			? result.then((result) => (result ? [] : [message]))
			: Promise.resolve(result ? [] : [message]); // TODO: Provide console warning that the user should be using generic for performance
	};
}
