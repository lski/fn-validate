const isFunc = require('../utils/is-func');
const isPromise = require('../utils/is-promise');

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 * 
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
 */
module.exports = function (validators, runAll = false) {

    if (!Array.isArray(validators)) {
        throw new Error('combineAsync requires that validators are an array of functions');
    }

    // handle an empty array of validators not causing errors
    if (validators.length === 0) {
        return () => Promise.resolve([]);
    }

    // No point in wrapping this function if only one
    if (validators.length === 1) {
        const validator = validators[0];

        return (val) => {
            var result = validator(val);
            return isPromise(result) ? result : Promise.resolve(result);
        }
    }

    if (runAll) {
        return val => runAllValidators(validators, val);
    }

    return val => firstErrorValidator(validators, val);
};

function runAllValidators(validators, val) {

    const promises = validators.map(validator => {

        const result = validator(val);

        return isPromise(result) ? result : Promise.resolve(result);
    });

    return Promise.all(promises).then(results => {
        return results.reduce((output, result) => output.concat(result), []);
    });
}

function firstErrorValidator(validators, val) {

    return new Promise((resolve, reject) => {

        let errorFound = false; // Use this in case a promise resolves after an error has already been resolved
        let resultsRemaing = validators.length;

        for(let i = 0, n = validators.length; i < n; i++) {

            if(errorFound) {
                return;
            }

            try {
                const result = validators[i](val);
                const isPromiseResult = isPromise(result);

                if (!isPromiseResult && result.length > 0) {

                    errorFound = true;
                    resolve(result);
                    break;
                }
                else if(!isPromiseResult) {
                    
                    if(--resultsRemaing === 0) {
                        resolve([]);
                    }
                }
                else {

                    result.then(result => {

                        if (result.length > 0) {
                            errorFound = true;
                            resolve(result);
                        }
                        else if(--resultsRemaing === 0) {
                            resolve([]);
                        }

                    }).catch(reject);
                }

            } catch (err) {
                reject(err);
            }

        }
    });
}