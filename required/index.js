module.exports = (message = 'This is required') => {

    return (val) => {

        return val ? [] : [message];
    };
};