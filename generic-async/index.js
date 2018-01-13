const customAsync = require('../custom-async');
const log = require('../utils/log');

function genericAsync(func, message) {

    log('Warning: generic-async has been renamed to custom-async. generic-async has been depreciated and will be removed in the next major version.');

    return customAsync(func, message);
};

module.exports = genericAsync;