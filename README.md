# fn-validate

[![Npm Version](https://img.shields.io/npm/v/fn-validate.svg)](https://www.npmjs.com/package/fn-validate)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lski/Lski.Fn/blob/master/LICENSE)

```
npm i fn-validate --save
```

## Extensible, Chainable Functional Javascript Data Validation.

Wouldnt it be great if you could pass a single value into a function and have it tell you if there are any errors with it? Wouldnt it be even better if you could combine several of those functions together into a single function that can be used in the same simple way? __Now supports asynchronous [validators](#Async%20-%20Custom%20and%20Combine)!__

Example:
```js
const shorterThanFive = maxLenth(5); // create the validator
const shortEnough = 'Ok';
const tooLong = 'This is WAY too long';

shorterThanFive(shortEnough) // == [];
shorterThanFive(tooLong) // == ['Too long'];
```
As you can see you create a validator with one of the many "[validator creators](#validation%20creators)" in this library, then you can use it again and again.

__NB:__ All validators and validator creators are 'pure' functions so you can be confident of deterministic results.

## Combine Validators

As all validators accept only one parameter and always return arrays, then validators can be combined together to create complex validation for a value. The result of using a combine is a function that accepts and returns the same as a normal validator, so you dont need to handle it in code, its done for you.

```js
let combined = combine([email(), maxLength(20)]);

combined("this is not an email address and it is too long"); // == ['Email address is not valid']
```

By default `combine` returns on the first error found, to save unnecessary processing. However if you want to run all validators regardless and get all the results back together, you can pass `true` as the second parameter.

```js
let validator = combine([email(), maxLength(20)], true);

validator("a@b.c");  // []
validator("foo");    // ['Email address is not valid']
validator("not an email address and it is too long"); // ['Email address is not valid', 'Too long']
```

__NB:__ To combine asynchronous validators, see [async](#Async%20-%20Custom%20and%20Combine) below.

## Error Messages

Each of the validators has a default message, but its possible to change the error message of all supplied validator creators when creating the validator. Which is important for localisation.

```js
let isRequired = required('A new error message');
let moreThan10 = moreThan('Woooo that value is way too small');

isRequired(null); // ['A new error message']
moreThan10(5); // == ['Woooo that value is way too small']
```


## Async - Custom and Combine

Sometimes we need to validate against an external resource, perhaps a service to say if a username is taken.

There are a couple of functions for handling async validation. The only difference being instead of returning an array, they return a Promise, that in turn resolves to an array.

```js
import { customAsync } from 'fn-validate';

const validator = customAsync(val => Promise.resolve(val === 'Hello world'));

validator('Hello universe').then(result => /* result == ['Value is incorrect'] */);
```
`customAsync` accepts any function that returns a Promise that resolves to true or false depending on whether the value is valid or not. The validator then returns a Promise that resolves to an array of errors.

To go along with `customAsync` there is also an async version of combine `combineAsync`. The best thing about `combineAsync` is it works with both asynchronous validators, like customAsync, and [synchronous validators](#validation%20creators) like required.

```js
import { required, combineAsync, customAsync } from 'fn-validate';

const validator = combineAsync([
    required(),
    customAsync(val => Promise.resolve(val === 'Hello world'))
]);

validator().then(result => /* result == ['This is required'] */);
validator('Hello world').then(result => /* result == [] */);
validator('Hello universe').then(result => /* result == ['Value is incorrect'] */);
```

`combineAsync` tries to be smart by exiting on the first error found and not running validators unnecessarily. To do this it will return as soon as possible, if a synchronous validator is first then it will resolve to that without actually running any of the async validators. It is therefore recommended that you place your synchronous validators first.


## Validation Creators

### Synchronous Validation Creators.

| Validator | Description |
| --------- | --- |
| required |  If a value is 'falsy' it is considered invalid |
| required-with-defaults | Same as required, except you explicitly list the what counts as an invalid value. (Matches using ===) |
| is-numeric | Ensures a value is either a number or a string that can be converted into a number (via parseFloat) |
| email | Checks a string against a regex to see if the value matches an email address format or not |
| max-length | Checks a string is longer than the number stated |
| min-length | Checks a string is not longer than the number stated |
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
| custom | Accepts a func that runs on each validation, which returns a boolean to state if the value is valid or not |

### Asynchronous Validation Creators

| Validator | Description |
| --------- | --- |
| custom-async | Accepts a func that runs on each validation, which returns a boolean to state if the value is valid |

__NB__ Reminder async returns a Promise that resolves to an array, rather than a array

## Extending

A validator is just a function that accepts a single parameter and returns an array with error messages in. All the validator creators above do is accept some information and then returns a validator function.

So you can either just create a function to return an array, or if you want to reuse logic in several places just create a validator creator using the format below:

```js
module.exports = (message = '') => {

    return (val) => {
        // logic goes here
    };
};
```
## Usage

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

#### Semantic Versioning

This project adheres to semantic versioning to give confidence in any changes that might happen.

#### Migrate v1 to v2

- The only real change is the behaviour to combine.
    - Instead of running all the validators by default now requires a an additional true parameter to run all
    - The validators need to passed as an array rather than a dynamic list of parameters.
- Password validator was removed as it was the only validator that had an inconistent aim of what it tried to achieve. Use a combination of the other validators with "combine" for greater flexibilty

#### Migrate v2 to v3

- functions generic and generic-async have been removed
- renamed more-than-or-equal-to changed to greater-than-or-equal-to
- renamed more-than to greater-than
- renamed require-with-default to not-default
