module.exports = function (func) {

    if (typeof func === 'function' && func.call) {
        return true;
    }

    return false;
}