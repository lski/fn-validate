# fn-validate

[![Npm Version](https://img.shields.io/npm/v/fn-validate.svg)](https://www.npmjs.com/package/fn-validate)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lski/Lski.Fn/blob/master/LICENSE)

## Extensible and chainable Javascript data validation. 

A validator is a simple function that excepts a value to validate as a parameter and states returns whether it is valid or not. It produces an array of any validation errors, an empty array means there were no errors.

A validator is created calling a function and supplying it any criteria it needs to perform the validation. That validator can then be used over and over again. E.g. Below shows a validator being created that ensures a string is at least 10 characters long:

```js
let validator = minLenth(10);

validator('the message to validate'); // []
validator('oops'); // ['Not long enough']
```

The advantage about using arrays as responses is validators can be chained together, [see combine](#combine). Validators included in this project supported are listed [below](#vaildators).

## Install

Available on npm:

```
npm i fn-validate --save
```

## Usage

fn-validate supports UMD so it can used in modules, in AMD and on a web page with a global variable

```js
const fnValidate = require('fn-validate');
```

```html
<script src="dist/fn-validate.min.js"></script>
<script>
    var validator = fnValidate.required();
    validator('a value');
</script>
```

If bundling using a product like webpack, fn-validate supports including just the functions you actually need, to keep bundle sizes minimal:

```js
const isEmail = require('fn-validate/email');
const isNumeric = require('fn-validate/is-numeric');
```

Each of the validators has a default message, but all can have the error message passed in when creating the validator. Which is important for localisation.

```js
const required = require('fn-validate/require');

let validator = required('A new error message');
validator(null); // ['A new error message']
```

### Combine

If you need to combine multiple validators use the combine method.

```js
const { combine, email, maxLength } = require('fn-validate');

let all = combine(email(), maxLength(10));
all("a@b.c");  // []
all("foo");    // ['Email address is not valid']
all("not an email address"); // ['Email address is not valid', 'Too long']
```

## Extending

Creating your own validator is very simple, use the template below. You will then be able to chain them together.

```js
module.exports = (message = '') => {
    
    return (val) => {
        // logic goes here
    };
};
```

## Validators

| Validator | Description |
| --------- | --- |
| required |  If a value is 'falsy' it is considered invalid |
| required-with-defaults | Same as required, except you explicitly list the what counts as an invalid value. (Matches using ===) |
| is-numeric | Ensures a value is either a number or a string that can be converted into a number via parseFloat |
| email | Checks a string against a regex to see if the value matches an email address format or not |
| max-length | Checks a string is long enough compared to the number stated |
| min-length | Checks a string is not longer then the number passed in |
| length-between | Checks a string is between a minimum and maximum length |
| matches | Compares a string against a regex |
| equal-to | Compares to a value to a another value returned from a function supplied when creating the validator |
| has-lowercase | Excepts a string to have a lowercase letter in it. Useful for password validation |
| has-uppercase | Excepts a string to have a uppercase letter in it. Useful for password validation |
| has-numeric | Excepts a string to have a number character in it. Useful for password validation |
| has-char | Excepts a string to contain one of the characters specified as a string or array when creating the validator. Useful for password validation |
| allowed-chars | Expects a string to contain a certain range of characters, e.g. lowercase, uppercase or numeric and can be supplied with a list of symbols. Useful for password validation |
| less-than | Ensures a value is less than a supplied value |
| less-than-or-equal-to | Ensures a value is less or equal to than a supplied value |
| more-than | Ensures a value is more than a supplied value |
| more-than-or-equal-to | Ensures a value is more or equal to than a supplied value |
| password | Excepts a series of parameters such as minimum length and symbols allowed etc to state whether a password is valid or not |

*More validators coming*