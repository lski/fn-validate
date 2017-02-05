module.exports = (min, max, message = 'Should be between ' + min + ' and ' + max) => {

    return (val) => {

        let parsed = parseFloat(val);

        return !isNaN(parsed) && (val < min || val > max) ? [message] : [];
    };
};