const isString = require('../utils/is-string');

module.exports = (message = 'Requires an uppercase character') => {
    
    var reg = /[A-Z]/;

    return (val) => {
    
        return isString(val) && reg.test(val) ? [] : [message];
    };
};