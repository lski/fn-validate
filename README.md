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

The simpliest way to install in Node is:
```bash
npm i fn-validate --save
# Or
yarn add fn-validate
```

In the browser:
```html
<script src="https://unpkg.com/fn-validate@4/dist/fn-validate.min.js" crossorigin="anonymous"></script>
<script>
    // fnValidate global available
</script>
```

<details>
<summary>
    Bundle Details
</summary>
<div>
<p>`fn-validate` comes bundled in three flavours: ES Modules, IIFE and CJS.</p>


The **ES Modules** build is compiled to run in any browser supports modules e.g. `<script type="module"></script>`. Because those browsers support many modern features (e.g. async/await, arrow functions, Map, Set, etc), the output is a lot cleaner and in theory a lot quicker as it runs builtin features rather than polyfilled versions.

**IIFE** (immediately invoked function expression) is a self executing function that exposes an `fnValidate` global designed for using directly in the browser and compiled to run in anything above IE 11.

**CJS** (CommonJS) is also compiled to run in older Node versions and when imported via `require()` statement. It is also compiled down to a version that will run in anything above IE 11.

See [Browser Support](#Browser%20Support) for using it with bundlers.

**NB:** As can be seen in `package.json` this project supports several entry point fields: `main`, `module` and `exports`.

`main` is for older versions of NodeJS, but also the `exports` field for serving the ES Modules version if `imported` or CJS if `required` for more modern NodeJS versions. It also supports the `module` field for use with bundlers and supports

Finally you can use the ES version of the code directly:
```html
<script type="module" crossorigin="anonymous">
    import { required } from 'https://unpkg.com/fn-validate@4/dist/fn-validate.es.js';
    required();
</script>
<script src="https://unpkg.com/fn-validate@4/dist/fn-validate.min.js" nomodule crossorigin="anonymous"></script>
<script nomodule>
    fnValidate.required();
</script>
```
</div>
</details>

## Browser Support

- **IIFE** = IE11+
- **CJS**: NodeJS & IE11+
- **ESModules**: Browsers that support ES Modules

<details>
<summary>
    Browser Support with a bundler (e.g. webpack/rollup)
</summary>
<div>
When using a bundler  they will use the ES Modules version by default as its   exposed via the <code>module</code> field. This is desireable as it will enable treeshaking and also use clean/  modern code, but if you need to support older browsers you will need to include it in babel's compliation. Most devs exclude code in node_modules to speed compliation so change the exclude field   to: <code>exclude: /node_modules(?!\/(fn-validate))/</code>
</div>
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

## Roadmap

- Add specific validators to the library now its been cleaned up E.g. isCreditCardNo etc as I come across a need for them.
- Convert to Typescript.

## Build

```bash
yarn run build
```

## Publish

*Remember to login first, includes pre-testing stage.*

```bash
yarn run deploy
```