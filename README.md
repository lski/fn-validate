# fn-validate

## Extensible and chainable Javascript data validation. 

A validator is a simple function that excepts a value as a single parameter and returns whether it is invalid or not by by passing back an array of errors. If the array is empty there are no errors, otherwise they are returned as an array of error messages.

### Validators

- required

    If a value is 'falsy' it is considered invalid

- required-with-defaults

    Same as required, except you explicitly list the what counts as an invalid value. Matches using ===

- email

    Matches against a regex to see if the value matches an email address or not

- max-length

    States the maximum length of a string before it becomes invalid

- min-length

    States the minimum length of a string before it becomes invalid

- length-between

    States both a minimum and maximum length of a string

- matches

    Excepts a regex and matches against it

- password

    Excepts a series of parameters such as minimum length and symbols allowed etc to state whether a password is valid or not.

- More coming

### Install

Available on npm or in a script tag.

```
npm i fn-validate --save
```

Each validator can be imported as a full package into a file or per function, to keep file size down.

```
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
const { combine, requiredm maxLength } = require('fn-validate');

let all = combine(required(), maxLength(5));
let result = all(null);
// result = ['This value is required']
let result = all("foo");
// result == []
let result = all("foobar");
// result == ['Too long']
```

Creating your own validator is very simple, use the template below. You will then be able to chain them together.

```js
module.exports = (message = '') => {
    
    return (val) => {
        // logic goes here
    };
};
```