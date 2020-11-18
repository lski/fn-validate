// fn-validate 3.0.0
const isString = (val) => {
	return typeof val === 'string' || val instanceof String;
};

const matches = (regex, message = 'Value doesnt match pattern') => {
	regex = isString(regex) ? new RegExp(regex) : regex;

	return (val) => {
		return regex.test(val) ? [] : [message];
	};
};

const regexEscape = (value) => {
	return value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/**
 *
 *
 * @param {boolean=} lowercase
 * @param {boolean=} uppercase
 * @param {boolean=} numeric
 * @param {?string=} allowedSymbols
 * @param {string=} message The error message to display
 */
const allowedChars = (
	lowercase = true,
	uppercase = true,
	numeric = true,
	allowedSymbols = '',
	message = 'Value contains restricted characters'
) => {
	let regexBuilder = '^[';

	if (lowercase) {
		regexBuilder += 'a-z';
	}

	if (uppercase) {
		regexBuilder += 'A-Z';
	}

	if (numeric) {
		regexBuilder += '0-9';
	}

	if (allowedSymbols) {
		regexBuilder += regexEscape(allowedSymbols);
	}

	regexBuilder += ']*$';

	return matches(new RegExp(regexBuilder), message);
};

const between = (min, max, message = 'Should be between ' + min + ' and ' + max) => {
	return (val) => {
		let parsed = parseFloat(val);

		return !isNaN(parsed) && (val < min || val > max) ? [message] : [];
	};
};

function isFunction(func) {
	if (typeof func === 'function' && func.call) {
		return true;
	}

	return false;
}

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 *
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
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
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 *
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
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

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run.
 *
 * @param {func} func
 * @param {string} message
 */
const custom = (func, message = 'Value is incorrect') => {

    if (!isFunction(func)) {
        throw new Error('func needs to be a function');
    }

    return (val) => {
        return func(val) ? [] : [message];
    };
};

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run.
 *
 * @param {func} func
 * @param {string} message
 */
function customAsync(func, message = 'Value is incorrect') {
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

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const email = (message = 'Email address is not valid') => {

    return (val) => {

        return emailRegex.test(val) ? [] : [message];
    }
};

/**
 * Compares to a value to a another value returned from a function
 *
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value
 * @param {string} message - The validation message to return to the user
 */
const equalTo = (otherValue, message = 'Values are not equal') => {

    var check = isFunction(otherValue) ? otherValue : () => otherValue;

    return (val) => {
        return check() === val ? [] : [message];
    };
};

const greaterThan = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val > minValue ? [] : [message];
	};
};

const greaterThanOrEqualTo = (minValue, message = 'Value is too small') => {
	return (val) => {
		return val >= minValue ? [] : [message];
	};
};

const hasChar = (characters = '', message = 'Missing required character') => {

    // TODO [LC] Consider testing this against a regex version for speed
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

const hasLowercase = (message = 'Requires a lowercase character') => {
	var reg = /[a-z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

const hasNumeric = (message = 'Requires a number') => {
	var reg = /\d/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

const hasUppercase = (message = 'Requires an uppercase character') => {
	var reg = /[A-Z]/;

	return (val) => {
		return isString(val) && reg.test(val) ? [] : [message];
	};
};

function isNumber(num) {
	return typeof num === 'number';
}

const isNumeric = (message = 'Value is not a valid number') => {
	return (val) => {
		if (isNumber(val)) {
			return [];
		}

		return isNaN(parseFloat(val)) ? [message] : [];
	};
};

const lengthBetween = (
	minLength,
	maxLength,
	message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length'
) => {
	return (val) => {
		return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
	};
};

const lessThan = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val < maxValue ? [] : [message];
	};
};

const lessThanOrEqualTo = (maxValue, message = 'Value is too large') => {
	return (val) => {
		return val <= maxValue ? [] : [message];
	};
};

const maxLength = (maxLength, message = 'Too long') => {
	return (val) => {
		return isString(val) && val.length > maxLength ? [message] : [];
	};
};

const minLength = (minLength, message = 'Not long enough') => {
	return (val) => {
		return isString(val) && val.length < minLength ? [message] : [];
	};
};

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
 * @param {string} message - The validation message to return to the user
 */
const notEqualTo = (otherValue, message = 'Values should not be the same') => {

    var check = isFunction(otherValue) ? otherValue : () => otherValue;

    return (val) => {
        return check() !== val ? [] : [message];
    };
};

const required = (message = 'This is required') => {
	return (val) => {
		return val ? [] : [message];
	};
};

export { allowedChars, between, combine, combineAsync, custom, customAsync, email, equalTo, greaterThan, greaterThanOrEqualTo, hasChar, hasLowercase, hasNumeric, hasUppercase, isNumeric, lengthBetween, lessThan, lessThanOrEqualTo, matches, maxLength, minLength, notDefault, notEqualTo, required };
//# sourceMappingURL=fn-validate.es.js.map
