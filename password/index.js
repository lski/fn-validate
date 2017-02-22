const escape = require('../utils/regex-escape');

module.exports = (minLength = 8, maxLength = 128, allowedSymbols = "", requireNumber = true, requireLowercase = true, requireUppercase = true, requireSymbol = false, message = "Password is not valid") => {

    let regexBuilder = "^";

    if (requireNumber) {
        regexBuilder += "(?=.*\\d)";
    }

    if (requireLowercase) {
        regexBuilder += "(?=.*[a-z])";
    }

    if (requireUppercase) {
        regexBuilder += "(?=.*[A-Z])";
    }

    regexBuilder += "[a-zA-Z0-9";

    if (allowedSymbols) {
        regexBuilder += escape(allowedSymbols);
    }

    regexBuilder += "]";

    regexBuilder += "{" + minLength + "," + maxLength + "}$";

    let regex = new RegExp(regexBuilder);

    return (val) => {

        return regex.test(val) ? [] : [message];
    };
};