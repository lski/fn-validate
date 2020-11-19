import { isString } from './utils/is-string';

/**
 * Checks a value has at least one of the characters supplied
 *
 * @param {string} characters A string containing a list of characters check at least one is in the value to check.
 * @param {string=} message
 */
export const hasChar = (characters = '', message = 'Missing required character') => {

    // TODO: [LC] Consider testing this against a regex version for speed
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