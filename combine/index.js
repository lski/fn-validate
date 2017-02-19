module.exports = (validators) => {

    if(!Array.isArray(validators)) {
        validators = Array.prototype.slice.call(this);
    }

    if (validators.length === 0) {
        return validators;
    }

    return (val) => {

        return validators.reduce((errors, validator) => {

            return errors.concat(validator(val));

        }, []);
    };
};