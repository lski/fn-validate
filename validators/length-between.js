const isString = require('../utils/is-string');
const replace = require('../utils/replace-values');

module.exports = (minLength, maxLength, message = 'Should be between ' + minLength + ' and ' + maxLength + ' in length') => {
    
    return (val) => {

        if(isString(val) && (val.length < minLength || val.length > maxLength)){

            return [message];
        }

        return [];
    };
};