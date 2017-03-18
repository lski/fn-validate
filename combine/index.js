const isFunc = require('../utils/is-func');

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 * 
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
 */
module.exports = function (validators, runAll) {

    if (!Array.isArray(validators)) {
        throw new Error('combine requires that validators are an array of functions');
    }

    // handle an empty array of validators not causing errors
    if (validators.length === 0) {
        return () => [];
    }

    // No point in wrapping this function if only one
    if (validators.length === 1) {
        return validators;
    }

    if (runAll === true) {
        return (val) => validators.reduce((errors, validator) => errors.concat(validator(val)), []);
    }

    return (val) => {

        for (let i = 0, n = validators.length; i < n; i++) {

            let validator = validators[i];
            let result = validator(val);

            if (result.length > 0) {
                return result;
            }
        }

        return [];
    }
};