const isString = require('../utils/is-string');

module.exports = (message = 'Requires a number') => {
    
    var reg = /\d/;

    return (val) => {
    
        return isString(val) && reg.test(val) ? [] : [message];
    };
};