# caller-source-location

Node module that gives exact location of its invocation inside caller's source code file

## API

Exported `CallerSourceLocation` function takes one parameter as a input:

  * `depth` - tells how many callers from call stack should be skipped (`0` by default)

Function returns an object containing following properties:

  * `file` - source code file path, relative to the main directory
  * `line` - source code line
  * `column` - source code column

## Examples

### Simple example

Input file *example.js*
```js
const CallerSourceLocation = require('caller-source-location');

const tasks = [
  () => CallerSourceLocation(),
  () => new Promise(resolve => resolve(CallerSourceLocation())),
  async () => CallerSourceLocation()
];

Promise
  .all(tasks.map(task => task()))
  .then(locations => console.log(locations));
```

Output
```
[ { file: 'example.js', line: 4, column: 9 },
  { file: 'example.js', line: 5, column: 42 },
  { file: 'example.js', line: 6, column: 15 } ]
```

### Nesting

To track `foo` function invocation location, pass `2` as `CallerSourceLocation` is nested twice inside `foo`

```js
const CallerSourceLocation = require('caller-source-location');

const foo = function () {
  const bar = function () {
    const depth = 2;
    const location = CallerSourceLocation(depth);
    console.log(location);
  };

  bar();
};

foo();
foo();
```

Output

```
{ file: 'example.js', line: 13, column: 1 }
{ file: 'example.js', line: 14, column: 1 }
```

### Relative paths

File paths are relative to the main file directory, therefore having `/foo/example.js` file and running

  * `/ $ node foo/example.js`
  * `/foo $ node example.js`
  * `/foo/bar $ node ../example.js`

will have the same result `file` paths.

## Compatibility

Bases on [stack-trace](https://www.npmjs.com/package/stack-trace) library thus requires [V8](https://developers.google.com/v8) powered environment (*Node.js*, *Chromium*).

## License
[MIT](license.md)
