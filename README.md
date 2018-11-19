# transform-keys [![](https://img.shields.io/npm/v/@cocopina/transform-keys.svg?colorA=cb3837&colorB=474a50)](https://www.npmjs.com/package/@cocopina/transform-keys)

Creates a deep clone of a JSON data structure with keys transformed by a provided function.

## Table of Contents

- [Installation](#installation)
- [API](#api)
    * [`transformKeys(object, transform, [options])`](#transformkeysobject-transform-options)
        * [`object [Object]`](#object-object)
        * [`transform [Function]`](#transform-function)
        * [`options [Object]`](#options-object)

## Installation

Install the package:
```sh
npm i @cocopina/transform-keys
```

## API

### `transformKeys(object, transform, [options])`

Returns a new, transformed object.

```js
import transformKeys from '@cocopina/transform-keys';

const transformFn = (value) => `_${value}`;
const object = {
    key: 1
};
const transformed = transformKeys(object, transformFn);

console.log(transformed); // {_key: 1}
```

#### `object [Object]`

The object which keys' you wish to transform.

#### `transform [Function]`

The transformation function you wish to use on the object's keys.

#### `options [Object]`

Additional options:

| Option | Type | What It Does | Default |
|------------------|--------------------|-----|-----|
| `deep` | `Boolean` | Whether or not to transform the object's keys recursively | `true` |
| `recursionLevel` | `Number` | How deep should the transformation go | - |
