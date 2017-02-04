module.exports = (defaultValues, message = 'This is required') => {

    defaultValues = Array.isArray(defaultValues) ? defaultValues : [defaultValues];

    return (val) => {

        for (let i = 0, n = defaultValues.length; i < n; i++) {

            if (val === defaultValues[i]) {
                return [message];
            }
        }

        return [];
    };
};