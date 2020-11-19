const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Checks a string against a regex to see if the value matches an email address format or not
 *
 * @param {string=} message
 */
export const email = (message = 'Email address is not valid') => {

    return (val) => {

        return emailRegex.test(val) ? [] : [message];
    }
};