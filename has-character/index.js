const isString = require('../utils/is-string');

module.exports = (characters = '', message = 'Missing required character') => {

    if (isString(characters)) {
        characters = characters.split('');
    }

    return (val) => {

        if (!isString(val)) {
            return [];
        }

        for (let i = 0, n = characters.length; i < n; i++) {

            if (val.indexOf(characters[i]) > -1) {
                return [];
            }
        }

        return [message];
    };
};