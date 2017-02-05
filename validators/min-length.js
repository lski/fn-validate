const isString = require('../utils/is-string');

module.exports = (minLength, message = 'Not long enough') => {

    return (val) => {

        return isString(val) && val.length < minLength ? [message] : [];
    };
};