const custom = require('../custom');
const log = require('../utils/log');

module.exports = (func, message) => {

    log('Warning: generic has been renamed to custom. generic has been depreciated and will be removed in the next major version.');

    return custom(func, message);
};