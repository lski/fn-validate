import { isFunction } from './utils/is-func';

/**
 * Compares to a value to a another value returned from a function
 *
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value
 * @param {string} message - The validation message to return to the user
 */
export const equalTo = (otherValue, message = 'Values are not equal') => {

    var check = isFunction(otherValue) ? otherValue : () => otherValue;

    return (val) => {
        return check() === val ? [] : [message];
    };
};