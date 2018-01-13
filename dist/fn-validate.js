// [AIV] Build version: 2.3.0 
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fnValidate"] = factory();
	else
		root["fnValidate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function (val) {

    return typeof val === 'string' || val instanceof String;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (func) {

    if (typeof func === 'function' && func.call) {
        return true;
    }

    return false;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (regex) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Value doesnt match pattern';


    regex = isString(regex) ? new RegExp(regex) : regex;

    return function (val) {

        return regex.test(val) ? [] : [message];
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (num) {

    return typeof num === 'number';
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (val) {
    return val instanceof Promise;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (value) {

    return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var matches = __webpack_require__(2);
var escape = __webpack_require__(5);

module.exports = function () {
    var lowercase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var uppercase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var numeric = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var allowedSymbols = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'Contains restricted characters';


    var regexBuilder = "^[";

    if (lowercase) {
        regexBuilder += "a-z";
    }

    if (uppercase) {
        regexBuilder += "A-Z";
    }

    if (numeric) {
        regexBuilder += "0-9";
    }

    if (allowedSymbols) {
        regexBuilder += escape(allowedSymbols);
    }

    regexBuilder += "]*$";

    return matches(new RegExp(regexBuilder), message);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (min, max) {
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Should be between ' + min + ' and ' + max;


    return function (val) {

        var parsed = parseFloat(val);

        return !isNaN(parsed) && (val < min || val > max) ? [message] : [];
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isFunc = __webpack_require__(1);
var isPromise = __webpack_require__(4);

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 * 
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
 */
module.exports = function (validators) {
    var runAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


    if (!Array.isArray(validators)) {
        throw new Error('combineAsync requires that validators are an array of functions');
    }

    // handle an empty array of validators not causing errors
    if (validators.length === 0) {
        return function () {
            return Promise.resolve([]);
        };
    }

    // No point in wrapping this function if only one
    if (validators.length === 1) {
        var validator = validators[0];

        return function (val) {
            var result = validator(val);
            return isPromise(result) ? result : Promise.resolve(result);
        };
    }

    if (runAll) {
        return function (val) {
            return runAllValidators(validators, val);
        };
    }

    return function (val) {
        return firstErrorValidator(validators, val);
    };
};

function runAllValidators(validators, val) {

    var promises = validators.map(function (validator) {

        var result = validator(val);

        return isPromise(result) ? result : Promise.resolve(result);
    });

    return Promise.all(promises).then(function (results) {
        return results.reduce(function (output, result) {
            return output.concat(result);
        }, []);
    });
}

function firstErrorValidator(validators, val) {

    return new Promise(function (resolve, reject) {

        var errorFound = false; // Use this in case a promise resolves after an error has already been resolved
        var resultsRemaing = validators.length;

        for (var i = 0, n = validators.length; i < n; i++) {

            if (errorFound) {
                return;
            }

            try {
                var result = validators[i](val);
                var isPromiseResult = isPromise(result);

                if (!isPromiseResult && result.length > 0) {

                    errorFound = true;
                    resolve(result);
                    break;
                } else if (!isPromiseResult) {

                    if (--resultsRemaing === 0) {
                        resolve([]);
                    }
                } else {

                    result.then(function (result) {

                        if (result.length > 0) {
                            errorFound = true;
                            resolve(result);
                        } else if (--resultsRemaing === 0) {
                            resolve([]);
                        }
                    }).catch(reject);
                }
            } catch (err) {
                reject(err);
            }
        }
    });
}

// function firstErrorValidatorClassic(validators, val) {

//     // TODO: Investigate whether its better to simply return on first none async fail, rather than attempt to resolve in order
//     return new Promise((resolve, reject) => {

//         let i = 0;
//         let n = validators.length;
//         let promises = [];

//         while (i < n) {

//             try {
//                 const result = validators[i](val);
//                 const isPromiseResult = isPromise(result);

//                 // If the first result is synchronous and no asynchronous results have been found yet, then break out here
//                 if (!isPromiseResult && promises.length === 0 && result.length > 0) {
//                     resolve(result);
//                     break;
//                 }

//                 promises.push(isPromiseResult ? result : Promise.resolve(result));

//             } catch (err) {
//                 reject(err);
//             }

//             i++;
//         }

//         // Run through the remaining promise results and return the first one resolved
//         let promisesCompleted = 0;
//         const total = promises.length;

//         promises.forEach(promise => {
//             promise.then(result => {

//                 if(result && result.length) {
//                     return resolve(result);
//                 }

//                 if(++promisesCompleted === total) {
//                     console.log('resolved', promisesCompleted, total);
//                     return resolve([]);
//                 }

//             }).catch(reject);
//         });
//     });
// }

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isFunc = __webpack_require__(1);

/**
 * combines the validators by running them in sequence and returning the first error found, unless runAll is true
 * 
 * @param {Array} validators
 * @param {bool} runAll - If true will run all validators regardless and return all error messages, false by default.
 */
module.exports = function (validators, runAll) {

    if (!Array.isArray(validators)) {
        throw new Error('combine requires that validators are an array of functions');
    }

    // handle an empty array of validators not causing errors
    if (validators.length === 0) {
        return function () {
            return [];
        };
    }

    // No point in wrapping this function if only one
    if (validators.length === 1) {
        return validators;
    }

    if (runAll === true) {
        return function (val) {
            return validators.reduce(function (errors, validator) {
                return errors.concat(validator(val));
            }, []);
        };
    }

    return function (val) {

        for (var i = 0, n = validators.length; i < n; i++) {

            var validator = validators[i];
            var result = validator(val);

            if (result.length > 0) {
                return result;
            }
        }

        return [];
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Email address is not valid';


    return function (val) {

        return emailRegex.test(val) ? [] : [message];
    };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isFunc = __webpack_require__(1);

/**
 * Compares to a value to a another value returned from a function
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value 
 * @param {string} message - The validation message to return to the user
 */
module.exports = function (otherValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Values are not equal';


    var check = isFunc(otherValue) ? otherValue : function () {
        return otherValue;
    };

    return function (val) {
        return check() === val ? [] : [message];
    };
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isPromise = __webpack_require__(4);
var isFunc = __webpack_require__(1);

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run. 
 * 
 * @param {func} func
 * @param {string} message
 */
function genericAsync(func, message) {

    if (!isFunc(func)) {
        throw new Error('func needs to be a function');
    }

    return function (val) {

        var result = func(val);

        return isPromise(result) ? result.then(function (result) {
            return result ? [] : [message];
        }) : Promise.resolve(result ? [] : [message]); // TODO: Provide console warning that the user should be using generic for performance
    };
};

module.exports = genericAsync;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isFunc = __webpack_require__(1);

/**
 * The most basic validator, accepts a function that accepts a value and returns truthy/falsey value when the validator is run. 
 * 
 * @param {func} func
 * @param {string} message
 */
module.exports = function (func, message) {

    if (!isFunc(func)) {
        throw new Error('func needs to be a function');
    }

    return function (val) {
        return func(val) ? [] : [message];
    };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function () {
    var characters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Missing required character';


    // TODO [LC] Consider testing this against a regex version for speed
    if (isString(characters)) {
        characters = characters.split('');
    }

    return function (val) {

        if (!isString(val)) {
            return [];
        }

        for (var i = 0, n = characters.length; i < n; i++) {

            if (val.indexOf(characters[i]) > -1) {
                return [];
            }
        }

        return [message];
    };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Requires a lowercase character';


    var reg = /[a-z]/;

    return function (val) {

        return isString(val) && reg.test(val) ? [] : [message];
    };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Requires a number';


    var reg = /\d/;

    return function (val) {

        return isString(val) && reg.test(val) ? [] : [message];
    };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Requires an uppercase character';


    var reg = /[A-Z]/;

    return function (val) {

        return isString(val) && reg.test(val) ? [] : [message];
    };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isNumber = __webpack_require__(3);

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Value is not a valid number';


    return function (val) {

        if (isNumber(val)) {
            return [];
        }

        return isNaN(parseFloat(val)) ? [message] : [];
    };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (minLength, maxLength) {
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Should be between ' + minLength + ' and ' + maxLength + ' in length';


    return function (val) {

        return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
    };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (maxValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Value is too large';


    return function (val) {

        return val <= maxValue ? [] : [message];
    };
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (maxValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Value is too large';


    return function (val) {

        return val < maxValue ? [] : [message];
    };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (maxLength) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Too long';


    return function (val) {

        return isString(val) && val.length > maxLength ? [message] : [];
    };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (minLength) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Not long enough';


    return function (val) {

        return isString(val) && val.length < minLength ? [message] : [];
    };
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (minValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Value is too small';


    return function (val) {

        return val >= minValue ? [] : [message];
    };
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (minValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Value is too small';


    return function (val) {

        return val > minValue ? [] : [message];
    };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isFunc = __webpack_require__(1);

/**
 * Compares to a value to a another value returned from a function
 * @param {(func|*)} otherValue - If a function the return value from the function is compared, otherwise just does an exact match on the value 
 * @param {string} message - The validation message to return to the user
 */
module.exports = function (otherValue) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Values should not be the same';


    var check = isFunc(otherValue) ? otherValue : function () {
        return otherValue;
    };

    return function (val) {
        return check() !== val ? [] : [message];
    };
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (defaultValues) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'This is required';


    defaultValues = Array.isArray(defaultValues) ? defaultValues : [defaultValues];

    return function (val) {

        for (var i = 0, n = defaultValues.length; i < n; i++) {

            if (val === defaultValues[i]) {
                return [message];
            }
        }

        return [];
    };
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'This is required';


    return function (val) {

        return val ? [] : [message];
    };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    regexEscape: __webpack_require__(5),
    replaceValues: __webpack_require__(31),
    isString: __webpack_require__(0),
    isDate: __webpack_require__(30),
    isFunc: __webpack_require__(1),
    isNumber: __webpack_require__(3)
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function (date) {
    return Object.prototype.toString.call(date) === '[object Date]';
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (text, replacements) {

    var output = text;

    for (var prop in replacements) {

        output = output.replace("{" + prop + "}", replacements[prop]);
    }

    return output;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    utils: __webpack_require__(29),
    combine: __webpack_require__(9),
    between: __webpack_require__(7),
    email: __webpack_require__(10),
    lengthBetween: __webpack_require__(19),
    matches: __webpack_require__(2),
    maxLength: __webpack_require__(22),
    minLength: __webpack_require__(23),
    required: __webpack_require__(28),
    requiredWithDefaults: __webpack_require__(27),
    hasLowercase: __webpack_require__(15),
    hasUppercase: __webpack_require__(17),
    hasNumeric: __webpack_require__(16),
    hasChar: __webpack_require__(14),
    allowedChars: __webpack_require__(6),
    equalTo: __webpack_require__(11),
    lessThan: __webpack_require__(21),
    lessThanOrEqualTo: __webpack_require__(20),
    moreThan: __webpack_require__(25),
    moreThanOrEqualTo: __webpack_require__(24),
    isNumeric: __webpack_require__(18),
    generic: __webpack_require__(13),
    notEqualTo: __webpack_require__(26),
    genericAsync: __webpack_require__(12),
    combineAsync: __webpack_require__(8)
};

/***/ })
/******/ ]);
}); 