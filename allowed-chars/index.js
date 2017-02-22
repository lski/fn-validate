const matches = require('../matches');
const escape = require('../utils/regex-escape');

module.exports = (lowercase = true, uppercase = true, numeric = true, allowedSymbols = '', message = 'Contains restricted characters') => {

    let regexBuilder = "^[";

    if(lowercase) {
        regexBuilder += "a-z";
    }

    if(uppercase) {
        regexBuilder += "A-Z";
    }

    if(numeric) {
        regexBuilder += "0-9";
    }

    if(allowedSymbols) {
        regexBuilder += escape(allowedSymbols);
    }

    regexBuilder += "]*$"

    return matches(new RegExp(regexBuilder), message);
};