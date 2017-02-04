module.exports = (value) => {

    return value.replace(/\/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
};