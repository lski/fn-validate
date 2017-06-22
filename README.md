# fn-validate

[![Npm Version](https://img.shields.io/npm/v/fn-validate.svg)](https://www.npmjs.com/package/fn-validate)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lski/Lski.Fn/blob/master/LICENSE)

## Extensible, Chainable Functional Javascript Data Validation. 

Wouldn't it be great if you could create a function dynamically, that accepts a value and just returns an array listing any errors it finds?

Start by creating a validator with a validator creator:
```js
const longerThanTen = minLenth(10);
```

Then use that validator later in code to test values:
```js
longerThanTen('the message to validate'); // -> [] -> no errors

longerThanTen('oops'); // -> ['Not long enough'] -> error found with error message
```

This library contains a selection of "[validator creators](#validation%20creators)" like `minLength` which are higher order functions that accept criteria to test against, such as the minimum length of a string, and returns a function known as a validator that can be used to test values against that criteria.

Unlike validator creators, which can have many parameters, validators only ever accept one parameter, which is the value to test. As the criteria to validate against is added by the validator creator, the validator already knows what it needs to validate that value against, so can be used over and over, without the need to pass around the criteria.

A validator then returns an array of errors found with that value. In the example above that is whether the size of a string is at least 10 characters long. If no errors then the array is empty.

All validators and validator creators are 'pure' functions.

## Combine Validators

As all validators accept only one parameter and always return arrays, validators can be combined together to create complex validation on a value that returns an array of any potential errors in the same way as a single validator.

```js
import { combine, email, maxLength } from 'fn-validate';

let all = combine([email(), maxLength(20)]);

all("not an email address and it is too long"); // ['Email address is not valid']
```

By default each validator combined using `combine` are run in sequence and return on first fail. This is because some validation, such as the strength of a password, could be expensive to run each time and often only the first validation failure is needed.

To run all validators, regardless of whether there is a failure or not, pass `true` as the second parameter.

```js
let validator = combine([email(), maxLength(20)], true);

validator("a@b.c");  // []
validator("foo");    // ['Email address is not valid']
validator("not an email address and it is too long"); // ['Email address is not valid', 'Too long']
```

## Error Messages

Each of the validators has a default message, but its possible to change the error message of all supplied validator creators when creating the validator. Which is important for localisation.

```js
import required from 'fn-validate/required';

let isRequired = required('A new error message');

isRequired(null); // ['A new error message']
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

## Usage

Available on npm:

```
npm i fn-validate --save
```

fn-validate supports a UMD build, meaning it can be used with Common JS modules, AMD and also directly in the browser. 

Its also possible to just import the validator creators that are needed.

```js
import * as fnValidate from 'fn-validate';
import { email, isNumeric } from 'fn-validate';
import email from 'fn-validate/email';

// via commonjs
const fnValidate = require('fn-validate');
const email = require('fn-validate/email');
const isNumeric = require('fn-validate/is-numeric');
```

## Validation Creators

| Validator | Description |
| --------- | --- |
| generic | Accepts a func that runs on each validation and returns the result of being valid or not |
| required |  If a value is 'falsy' it is considered invalid |
| required-with-defaults | Same as required, except you explicitly list the what counts as an invalid value. (Matches using ===) |
| is-numeric | Ensures a value is either a number or a string that can be converted into a number via parseFloat |
| email | Checks a string against a regex to see if the value matches an email address format or not |
| max-length | Checks a string is long enough compared to the number stated |
| min-length | Checks a string is not longer then the number passed in |
| length-between | Checks a string is between a minimum and maximum length |
| matches | Compares a string against a regex |
| equal-to | Compares to a value to a another value returned from a function supplied when creating the validator |
| not-equal-to | Opposite of equal-to |
| has-lowercase | Excepts a string to have a lowercase letter in it. Useful for password validation |
| has-uppercase | Excepts a string to have a uppercase letter in it. Useful for password validation |
| has-numeric | Excepts a string to have a number character in it. Useful for password validation |
| has-char | Excepts a string to contain one of the characters specified as a string or array when creating the validator. Useful for password validation |
| allowed-chars | Expects a string to contain a certain range of characters, e.g. lowercase, uppercase or numeric and can be supplied with a list of symbols. Useful for password validation |
| less-than | Ensures a value is less than a supplied value |
| less-than-or-equal-to | Ensures a value is less or equal to than a supplied value |
| more-than | Ensures a value is more than a supplied value |
| more-than-or-equal-to | Ensures a value is more or equal to than a supplied value |

*More validators coming*

#### Semantic Versioning

This project adheres to semantic versioning

#### Migrate v1 to v2

- The only real change is the behaviour to combine. 
    - Instead of running all the validators by default now requires a an additional true parameter to run all
    - The validators need to passed as an array rather than a dynamic list of parameters.
- Password validator was removed as it was the only validator that had an inconistent aim of what it tried to achieve. Use a combination of the other validators with "combine" for greater flexibilty