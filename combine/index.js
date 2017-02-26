module.exports = function (validators) {

    if (!Array.isArray(validators)) {
        validators = Array.prototype.slice.call(arguments);
    }

    // handle an empty array of validators not causing errors
    if (validators.length === 0) {
        return () => [];
    }

    // No point in wrapping this function if only one
    if (validators.length === 1) {
        return validators;
    }

    return (val) => {

        return validators.reduce((errors, validator) => {

            return errors.concat(validator(val));

        }, []);
    };
};