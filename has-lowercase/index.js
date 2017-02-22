const isString = require('../utils/is-string');

module.exports = (message = 'Requires a lowercase character') => {
    
    var reg = /[a-z]/;

    return (val) => {
    
        return isString(val) && reg.test(val) ? [] : [message];
    };
};