import { isString } from './utils/is-string';

export const hasChar = (characters = '', message = 'Missing required character') => {

    // TODO [LC] Consider testing this against a regex version for speed
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