const isNumber = require('../utils/is-number');

module.exports = (message = 'Value is not a valid number') => {
    
    return (val) => {

        if(isNumber(val)) {
            return [];
        }
        
        return isNaN(parseFloat(val)) ? [message] : [];
    };
};