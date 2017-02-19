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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

module.exports = function (value) {

    return value.replace(/\/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (min, max) {
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Should be between ' + min + ' and ' + max;


    return function (val) {

        var parsed = parseFloat(val);

        return !isNaN(parsed) && (val < min || val > max) ? [message] : [];
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (validators) {

    if (validators.length === 0) {
        return validators;
    }

    return function (val) {

        return validators.reduce(function (errors, validator) {

            return errors.concat(validator(val));
        }, []);
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Email address is not valid';


    return function (val) {

        return emailRegex.test(val) ? [] : [message];
    };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (minLength, maxLength) {
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Should be between ' + minLength + ' and ' + maxLength + ' in length';


    return function (val) {

        return isString(val) && (val.length < minLength || val.length > maxLength) ? [message] : [];
    };
};

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (maxLength) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Too long';


    return function (val) {

        return isString(val) && val.length > maxLength ? [message] : [];
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isString = __webpack_require__(0);

module.exports = function (minLength) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Not long enough';


    return function (val) {

        return isString(val) && val.length < minLength ? [message] : [];
    };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(1);

module.exports = function () {
    var minLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;
    var allowedSymbols = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var requireNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var requireLowercase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var requireUppercase = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var requireSymbol = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var message = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "Password is not valid";


    var regexBuilder = "^";

    if (requireNumber) {
        regexBuilder += "(?=.*\\d)";
    }

    if (requireLowercase) {
        regexBuilder += "(?=.*[a-z])";
    }

    if (requireUppercase) {
        regexBuilder += "(?=.*[A-Z])";
    }

    regexBuilder += "[a-zA-Z0-9";

    if (allowedSymbols) {
        regexBuilder += escape(allowedSymbols);
    }

    regexBuilder += "]";

    regexBuilder += "{" + minLength + "," + maxLength + "}$";

    var regex = new RegExp(regexBuilder);

    return function (val) {

        return regex.test(val) ? [] : [message];
    };
};

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports) {

module.exports = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'This is required';


    return function (val) {

        return val ? [] : [message];
    };
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    isString: __webpack_require__(0),
    regexEscape: __webpack_require__(1)
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    utils: __webpack_require__(12),
    combine: __webpack_require__(3),
    between: __webpack_require__(2),
    email: __webpack_require__(4),
    lengthBetween: __webpack_require__(5),
    matches: __webpack_require__(6),
    maxLength: __webpack_require__(7),
    minLength: __webpack_require__(8),
    password: __webpack_require__(9),
    require: __webpack_require__(11),
    requireWithDefaults: __webpack_require__(10)
};

/***/ })
/******/ ]);
});