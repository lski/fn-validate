// fn-validate 3.0.0-alpha
function isNumber(num) {
	return typeof num === 'number';
}

/**
 * Checks a number is between two values (inclusively)
 *
 * @param {number} min
 * @param {number} max
 * @param {string=} message
 */
const between = (min, max, message = 'Should be between ' + min + ' and ' + max) => {
	return (val) => {
		let parsed = isNumber(val) ? val : parseFloat(val);

		return !Number.isNaN(parsed) && (val < min || val > max) ? [message] : [];
	};
};

function isFunction(func) {
	if (typeof func === 'function' && func.call) {
		return true;
	}

	return false;
}

/**
 * Combines a list of validators into... a new validator!
 *
 * Validators are run in sequence until the first error is found and is returned.
 * If runAll is `true` then all validators are run and all errors found (if any) are returned in an array.
 *
 * @param {Array<() => string[]>} validators List of validators to combine
 * @param {boolean} runAll If true will run all validators regardless and return all error messages, false by default.
 * @returns {string[]} Contains any validation errors found
 */
function combine(validators, runAll) {
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

const isPromise = (val) => {
	return val instanceof Promise;
};

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
function combineAsync(validators, runAll = false) {
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

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Checks a string against a regex to see if the value matches an email address format or not
 *
 * @param {string=} message
 */
const email = (message = 'Email address is not valid') => {

    return (val) => {

        return emailRegex.test(val) ? [] : [message];
    }
};

/**
 * Compares to a value to a another value or the value returned from a function
 *
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value
 * @param {string=} message - The validation message to return to the user
 */
const equalTo = (otherValue, message = 'Values are not equal') => {

    var check = isFunction(otherValue) ? otherValue : () => otherValue;

    return (val) => {
        return check() === val ? [] : [message];
    };
};

/**
 * Checks value is greater than a supplied value
 *
 * @param {number} minValue
 * @param {string=} message
 */
const greaterThan = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val > minValue ? [] : [message];
	};
};

/**
 * Checks value is greater than or equal to a supplied value.
 *
 * @param {number} minValue
 * @param {string=} message
 */
const greaterThanOrEqualTo = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val >= minValue ? [] : [message];
	};
};

const isString = (val) => {
	return typeof val === 'string' || val instanceof String;
};

/**
 * Checks a value has at least one of the characters supplied
 *
 * @param {string} characters A string containing a list of characters check at least one is in the value to check.
 * @param {string=} message
 */
const hasChar = (characters = '', message = 'Missing required character') => {

    // TODO: [LC] Consider testing this against a regex version for speed
    if (isString(characters)) {
        characters = characters.split('');
    }

    return (val) => {

        if (!isString(val)) {
            return [];
        }

        for (let i = 0, n = characters.length; i < n; i++) {

            if (val.indexOf(characters[i]) > -1) {
                return [];
            }
        }

        return [message];
    };
};

/**
 * Checks a value has at least one lowercase character
 *
 * NB: Currently English alphabet characters only
 *
 * @param {string=} message
 */
const hasLowercase = (message = 'Requires a lowercase character') => {
	var reg = /[a-z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

/**
 * Checks a value has at least one numeric character
 *
 * @param {string=} message
 */
const hasNumeric = (message = 'Requires a number') => {
	var reg = /\d/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

/**
 * Checks a value has at least one uppercase character
 *
 * NB: Currently English alphabet characters only
 *
 * @param {string=} message
 */
const hasUppercase = (message = 'Requires an uppercase character') => {
	var reg = /[A-Z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

/**
 * Checks if a value is a number or whether it can be converted to a number (via parseFloat)
 *
 * @param {string=} message
 */
const isNumeric = (message = 'Value is not a valid number') => {
	return (val) => {
		if (isNumber(val)) {
			return [];
		}

		return isNaN(parseFloat(val)) ? [message] : [];
	};
};

/**
 * Checks a string is between a minimum and maximum length (inclusive)
 *
 * @param {number} minLength
 * @param {number} maxLength
 * @param {string=} message
 */
const lengthBetween = (
	minLength,
	maxLength,
	message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length'
) => {
	return (val) => {
		return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
	};
};

/**
 * Checks value is less than a supplied value.
 *
 * @param {number} maxValue
 * @param {string=} message
 */
const lessThan = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val < maxValue ? [] : [message];
	};
};

/**
 * Checks value is less than or equal to a supplied value.
 *
 * @param {number} maxValue
 * @param {string=} message
 */
const lessThanOrEqualTo = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val <= maxValue ? [] : [message];
	};
};

/**
 * Checks a value matches a regexp pattern
 *
 * @param {string|RegExp} regex Pattern to match value against
 * @param {*} message
 */
const matches = (regex, message = 'Value doesnt match pattern') => {
	regex = isString(regex) ? new RegExp(regex) : regex;

	return (val) => {
		return regex.test(val) ? [] : [message];
	};
};

/**
 * Checks a string is not longer longer than the number stated
 *
 * @param {number} maxLength
 * @param {string=} message
 */
const maxLength = (maxLength, message = 'Too long') => {
	return (val) => {
		return isString(val) && val.length > maxLength ? [message] : [];
	};
};

/**
 * Checks a string is than the number stated
 *
 * @param {number} minLength
 * @param {string=} message
 */
const minLength = (minLength, message = 'Not long enough') => {
	return (val) => {
		return isString(val) && val.length < minLength ? [message] : [];
	};
};

/**
 * Similar to required, checks a value against a default or list of default values to ensure its been changed.
 * Uses exact match (===) for comparison.
 *
 * @param {*|*[]} defaultValues A single value or list of values that are considered 'default' e.g. [0,'', 'false']
 * @param {string=} message
 */
const notDefault = (defaultValues, message = 'This is required') => {
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

/**
 * Compares to a value to a another value returned from a function
 *
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value
 * @param {string=} message - The validation message to return to the user
 */
const notEqualTo = (otherValue, message = 'Values should not be the same') => {

    var check = isFunction(otherValue) ? otherValue : () => otherValue;

    return (val) => {
        return check() !== val ? [] : [message];
    };
};

/**
 * Checks a value is not 'falsy', considered invalid if it is.
 *
 * @param {string=} message
 */
const required = (message = 'Required') => {
	return (val) => {
		return val ? [] : [message];
	};
};

export { between, combine, combineAsync, email, equalTo, greaterThan, greaterThanOrEqualTo, hasChar, hasLowercase, hasNumeric, hasUppercase, isNumeric, lengthBetween, lessThan, lessThanOrEqualTo, matches, maxLength, minLength, notDefault, notEqualTo, required };
//# sourceMappingURL=fn-validate.es.js.map
