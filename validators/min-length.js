const isString = require('../utils/is-string');

module.exports = (minLength, message = 'Not long enough') => {

    return (val) => {

        if(val != null && !isString(val)) {
            throw new Error('Value "' + val + '" passed to minLength is not a string');
        }

        return val && (val.length >= minLength) ? [] : [message];
    };
};