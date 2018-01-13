const isPromise = require('../utils/is-promise');
const isFunc = require('../utils/is-func');

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run. 
 * 
 * @param {func} func
 * @param {string} message
 */
function genericAsync(func, message) {

    if (!isFunc(func)) {
        throw new Error('func needs to be a function');
    }

    return (val) => {

        const result = func(val);
        
        return isPromise(result)
            ? result.then(result => result ? [] : [message])
            : Promise.resolve(result ? [] : [message]); // TODO: Provide console warning that the user should be using generic for performance
    };
};

module.exports = genericAsync;