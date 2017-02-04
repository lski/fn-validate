module.exports = {
    combine(validators) {

        if(validators.length === 0){
            return validators;
        }

        return (val) => {

            return validators.reduce((errors, validator) => {

                 return errors.concat(validator(val));

            }, []);

        };
    }
};