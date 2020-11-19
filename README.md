# fn-validate

## Extensible, Chainable Functional Javascript Data Validation.

[![Npm Version](https://img.shields.io/npm/v/fn-validate.svg)](https://www.npmjs.com/package/fn-validate)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lski/Lski.Fn/blob/master/LICENSE)

A validation library design to be a light weight, agnostic, set of 'pure' functional lego bricks to build user input validation fro. *`fn-validate` supports tree shaking and adheres to sementic versioning.*

## Contents

- [Install](#install)
- [What is a Validator](#what-is-a-validator?)
- [Combining Validators](#combining-validators)
- [Creating Custom Validators](#creating-custom-validators)
- [Asynchronous Validators](#asynchronous-validators)
- [Pre-defined Validators](#pre-defined-validators)
- [Overriding Error Messages](#overriding-error-messages)

## Install

```bash
npm i fn-validate --save
# Or
yarn add fn-validate
```

<details>
<summary>
    Browser usage
</summary>

`fn-validate` is also available to use directly in the browser as global variable `fnValidate`.

```html
<script src="https://unpkg.com/fn-validate/dist/fn-validate.min.js"></script>
```
</details>

## What is a Validator?

A validator is way of validating data, it is a function that accepts data as a single parameter and returns an array stating whether the data was valid or not. If the array is empty, the data was valid, if not valid the array contains a descriptive error message.

```js
validator('This is a long message'); // => ['Too long']
```

So what does this library provide? It is a collection of validator 'creator' functions (higher order functions) that create different types of validators and importantly a way to combine them.

```js
import { maxLength } from 'fn-validate';

// create a reuseable validator to check that a string is not longer than 5 characters long
const validator = maxLength(5);

// use the validator to check inputs from user input
validator('Hi'); // => []
validator('hello'); // => []
validator('Hello world'); // ['Too long']
```

## Combining Validators

On its own that would be simple to implement by hand, but say we also need the value to be required and also an email address as well?

```js
import { email, maxLength, required, combine } from 'fn-validate';

// Create a validator that checks the value for multiple things using the combine method.
const validator = combine([
    maxLength(20),
    required(),
    email(),
]);

validator('example@email.com') // => []
validator(''); // => ['Required']
validator('asdasdasd'); // ['Email address is not valid']
validator('aseriouslylongemail@email.com'); // => ['Too long']
```

By default `combine` returns the first error found, however sometimes only showing one error at a time can be a bad user experience. To return all validation errors, pass `true` as the second argument.

```js
import { email, maxLength, required, combine } from 'fn-validate';

// Pass `true` as the second parameter, to return all validation errors.
const validator = combine([maxLength(20), required(), email()], true);

validator('this is a long message that isnt an email address');
// => ['Too long', 'Email address is not valid']
```

Best of all `combine` simply returns a new validator, so it can be combined with other validators in the same way :D

## Creating Custom Validators

A validator is just a function that returns an array with an error or not. So creating a custom validator to combine with others is very simple.

```js
const saysHello = (val) => {
    return val === 'hello' ? [] : [`Input should say 'hello'`];
};
```

This can then be combined with other validators using `combine`.

## Asynchronous Validators

Sometimes you need to validate against a server, or another asynchronous action. To do that we use the `combineAsync` helper instead of `combine` which returns a Promise.

### Example

Below we check a username is available on a server, by creating an async validator that sends a request to the server and using it with `combineAsync`. ***NB:** An async validator is only different to a normal validator as it returns a Promise that resolves to the array, rather than just an array.*

```js
/* checkUsernameAvailable.js */
export const checkUsernameAvailable = async (username) => {

    const url = `https://some.api/username/${encodeURIComponent(username)}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Error checking the username');
    }

    const result = await response.text();

    return data === 'true' ? [] : ['Username is not available'];
};
```

```js
/* index.js */
import { required, combineAsync } from 'fn-validate';
import { checkUsernameAvailable } from './checkUsernameAvailable';

const validator = combineAsync([
    required(),
    checkUsernameAvailable()
]);

validator(''); // => Promise resolved to ['Required']
validator('existing_username'); // => Promise resolved to ['Username is not available']
validator('an_unused_username'); // Promise resolved to []
```

***Perfomrance Tip:** Place any synchronous validators first as validators are called in sequence. If a validator returns a synchronous result that isnt valid, it will return immediately without calling later validators. Obviously this tip doest work with `runAll` set to `true`.*

## Pre-defined Validators

Below are the validators supplied with `fn-validate`, ***NB:** `fn-validate` supports tree shaking, so if using a build tool like webpack or rollup you wont include functions in your build that you dont use.*

| Validator | Description |
| -------- | --- |
| **required** |  If a value is 'falsy' it is considered invalid |
| **notDefault** | Similar to required, checks a value against a default or list of default values to en**sure its been changed. |
| **isNumeric** | Checks if a value is a number or whether it can be parsed as a number (via parseFloat) |**
| **email** | Checks a string against a regex to see if the value matches an email address format or not |**
| **maxLength** | Checks a string is not longer longer than the number stated |
| **minLength** | Checks a string is than the number stated |
| **lengthBetween** | Checks a string is between a minimum and maximum length (inclusive) |
| **matches** | Checks a value matches a regexp pattern |
| **equalTo** | Compares to a value to a another value or the value returned from a function |
| **notEqualTo** | Opposite of equalTo |
| **hasChar** | Checks a value has at least one of the characters supplied. Useful for password va**lidation |
| **hasLowercase** | Checks a value has at least one lowercase character. Useful for password validation |**
| **hasNumeric** | Checks a value has at least one numeric character. Useful for password validation |
| **hasUppercase** | Checks a value has at least one numeric character. Useful for password validation |
| **between** | Checks a number is between a minimum and maximum size (inclusive) |
| **lessThan** | Checks value is less than a supplied value |
| **lessThanOrEqualTo** | Checks value is less than or equal to a supplied value |
| **greaterThan** | Ensures a value is more than a supplied value |
| **greaterThanOrEqualTo** | Checks value is greater than or equal to a supplied value |

## Overriding Error Messages

Each of the pre-defined validators has a default message, but its possible to change the error message of a validator when creating it. Which is important for localis(z)ation.

```js
let isRequired = required('A new error message');
let moreThan10 = moreThan('Woooo that value is way too small');

isRequired(null); // ['A new error message']
moreThan10(5); // == ['Woooo that value is way too small']
```

## Build

```bash
yarn run build
```

## Roadmap

- Add specific validators to the library now its been cleaned up E.g. isCreditCardNo etc as I come across a need for them.
- Convert to Typescript.