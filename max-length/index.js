const isString = require('../utils/is-string');

module.exports = (maxLength, message = 'Too long') => {

    return (val) => {

        return isString(val) && val.length > maxLength ? [message] : [];
    };
};