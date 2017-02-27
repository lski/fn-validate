# fn-validate

[![Npm Version](https://img.shields.io/npm/v/fn-validate.svg)](https://www.npmjs.com/package/fn-validate)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lski/Lski.Fn/blob/master/LICENSE)

## Extensible and chainable Javascript data validation. 

A validator is a simple function that excepts a value as a single parameter and returns whether it is invalid or not by by passing back an array of errors. If the array is empty there are no errors, otherwise they are returned as an array of error messages.

Validators supported are listed below.

### Install

Available on npm:

```
npm i fn-validate --save
```

Or as a file, that can be included as a script tag:

```html
<script src="dist/fn-validate.min.js"></script>
<script>
    var validator = fnValidate.required();
    var result = validator('a value');
</script>
```

Each validator can be imported as a full package into a file or per function, to keep file size down.

```js
const validate = require(fn-validate);
// or
const email = require('fn-validate/email');
```

### Usage

To create a validator we run a function that wraps the criteria it needs. The simpliest validator is required.

```js
const required = require('fn-validate/require');

// create a validator to use
let validator = required();

// run the validator by passing it a value
let result = validator('a value');
// result == []

// if an invalid value is given an error message is returned in an array
result = validator(null);
// result == ['This value is required']
```

Each of the validators has a default message, but all can have the error message passed in when creating the validator. Which is important for localisation.

```js
const required = require('fn-validate/require');

let required = required('A new error message');
let result = validator(null);
// result = ['A new error message']
```

If you need to combine multiple validators use the combine method.

```js
const { combine, required, maxLength } = require('fn-validate');

let all = combine(required(), maxLength(5));
let result = all(null);
// result = ['This value is required']
let result = all("foo");
// result == []
let result = all("foobar");
// result == ['Too long']
```

### Extending

Creating your own validator is very simple, use the template below. You will then be able to chain them together.

```js
module.exports = (message = '') => {
    
    return (val) => {
        // logic goes here
    };
};
```

### Validators

| Validator | Description |
| --------- | --- |
| required |  If a value is 'falsy' it is considered invalid |
| required-with-defaults | Same as required, except you explicitly list the what counts as an invalid value. (Matches using ===) |
| email | Checks a string against a regex to see if the value matches an email address format or not |
| max-length | Checks a string is long enough compared to the number stated |
| min-length | Checks a string is not longer then the number passed in |
| length-between | Checks a string is between a minimum and maximum length |
| matches | Compares a string against a regex |
| has-lowercase | Excepts a string to have a lowercase letter in it. Useful for password validation |
| has-uppercase | Excepts a string to have a uppercase letter in it. Useful for password validation |
| has-numeric | Excepts a string to have a number character in it. Useful for password validation |
| has-char | Excepts a string to contain one of the characters specified as a string or array when creating the validator. Useful for password validation |
| allowed-chars | Expects a string to contain a certain range of characters, e.g. lowercase, uppercase or numeric and can be supplied with a list of symbols. Useful for password validation |
| password | Excepts a series of parameters such as minimum length and symbols allowed etc to state whether a password is valid or not |

*More validators coming*