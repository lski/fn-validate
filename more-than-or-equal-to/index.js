module.exports = (minValue, message = 'Value is too small') => {

    return (val) => {

        return val >= minValue ? [] : [message];
    };
};