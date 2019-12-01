# apply-middleware
Apply any number of middleware functions to the target function.
<br><sup>Created with [ds-library-starter](https://github.com/DejanSandic/ds-library-starter).</sup>

# Installation
npm:
```bash
npm install apply-middleware
```

yarn:
```bash
yarn add apply-middleware
```

# Usage
The `applyMiddleware()` function takes the list of functions as arguments.

The first function represents the target function, and every next function represents the middleware function.

```js
applyMiddleware(targetFunction, middleware1, middleware2, ...middlewares);
```

# Middleware function
The first argument of the middleware function is the `next()` callback.

Invoking the `next()` callback will invoke the `next()` middleware in the list.

In the last middleware function, the `next()` callback will invoke the target function.

```js
function myMiddleware (next, ...arguments) {
   next();
}
```

If we pass the arguments to the `next()` callback, they will be passed to the next middleware function replacing the previous arguments.

```js
function myMiddleware (next, ...arguments) {
   const newArguments = arguments.map(arg => arg + 1);
   next(newArguments);
}
```

If no arguments are passed to the next() callback, the next middleware will receive the same, unchanged arguments as the current middleware.

# Example
```js
import applyMiddleware from 'apply-middleware';

function addTimestamp (next, ...args) {
   const timestamp = new Date().toUTCString();
   next(timestamp, '---', ...args);
};

console.log = applyMiddleware(console.log, addTimestamp);

console.log('Hello', 'World'); // Sat, 30 Nov 2019 23:53:56 GMT --- Hello World

```

# Another example
```js
import applyMiddleware from 'apply-middleware';

function addOne (next, a, b) {
   next(a + 1, b + 1);
});

function logNumbers (next, a, b) {
   console.log(a, b);
   next();
});

function addDecimal (next, a, b) {
   next(a + 0.1, b + 0.1);
});

function saveToLocalStorage (a, b) {
   const json = JSON.stringify({ a, b });
   localStorage.setItem('numbers', json);
   console.log('Numbers have been saved to the local storage');
}

const withMiddleware = applyMiddleware(
   // Function to be wrapped
   saveToLocalStorage,

   // List of middlewares
   logNumbers,
   addOne,
   logNumbers,
   addDecimal,
   logNumbers
)

withMiddleware(1, 11);

// Execution order 
// logNumbers / console = 1, 11
// addOne
// logNumbers / console = 2, 13
// addDecimal
// logNumbers / console = 2.0, 13.0
// saveToLocalStorage / console = Numbers have been saved to the local storage
```

