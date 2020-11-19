import { isPromise } from './utils/is-promise';
import { isFunction } from './utils/is-func';

/**
 * Combines a list of validators into... a new validator!... Asynchronously
 *
 * Validators are run in sequence until the first error is found and is returned.
 * If runAll is `true` then all validators are run and all errors found (if any) are returned in an array.
 *
 * `combineAsync` works in the same way to `combine`, it differs in that returns a Promise that resolves to validation errors not an array directly.
 * `combineAsync` also accepts validators that return Promises that return arrays of string, not just arrays of strings, meaning it can accept
 *
 * @param {Array<() => string[] | PromiseLike<string[]>>} validators List of validators to combine
 * @param {boolean} runAll If true will run all validators regardless and return all error messages, false by default.
 * @returns {PromiseLike<string[]>} Contains any validation errors found
 */
export function combineAsync(validators, runAll = false) {
	if (!Array.isArray(validators)) {
		throw new Error('combineAsync requires that validators are an array of functions');
	}

	// handle an empty array of validators not causing errors
	if (validators.length === 0) {
		return () => Promise.resolve([]);
	}

	// check that validators passed in are functions
	for (let i = 0, end = validators.length; i < end; i++) {
		if (!isFunction(validators[i])) {
			throw new Error('Each validator needs to be a function');
		}
	}

	// No point in wrapping this function if only one
	if (validators.length === 1) {
		const validator = validators[0];

		return (val) => {
			var result = validator(val);
			return isPromise(result) ? result : Promise.resolve(result);
		};
	}

	if (runAll) {
		return (val) => runAllValidators(validators, val);
	}

	return (val) => firstErrorValidator(validators, val);
}

function runAllValidators(validators, val) {
	const promises = validators.map((validator) => {
		const result = validator(val);

		return isPromise(result) ? result : Promise.resolve(result);
	});

	return Promise.all(promises).then((results) => {
		return results.reduce((output, result) => output.concat(result), []);
	});
}

function firstErrorValidator(validators, val) {
	return new Promise((resolve, reject) => {
		let errorFound = false; // Use this in case a promise resolves after an error has already been resolved
		let resultsRemaing = validators.length;

		for (let i = 0, n = validators.length; i < n; i++) {
			if (errorFound) {
				return;
			}

			try {
				const result = validators[i](val);
				const isPromiseResult = isPromise(result);

				if (!isPromiseResult && result.length > 0) {
					errorFound = true;
					resolve(result);
					break;
				} else if (!isPromiseResult) {
					if (--resultsRemaing === 0) {
						resolve([]);
					}
				} else {
					result
						.then((result) => {
							if (result.length > 0) {
								errorFound = true;
								resolve(result);
							} else if (--resultsRemaing === 0) {
								resolve([]);
							}
						})
						.catch(reject);
				}
			} catch (err) {
				reject(err);
			}
		}
	});
}
