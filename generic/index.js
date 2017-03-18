const isFunc = require('../utils/is-func');

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run. 
 * 
 * @param {func} func
 * @param {string} message
 */
module.exports = (func, message) => {

    if (!isFunc(func)) {
        throw new Error('func needs to be a function');
    }

    return (val) => {
        return func(val) ? [] : [message];
    };
};