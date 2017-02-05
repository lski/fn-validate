const isString = require('../utils/is-string');

module.exports = (minLength, maxLength, message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length') => {
    
    return (val) => {

        return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
    };
};