# broccoli-cssnext-single
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]

The broccoli-cssnext-single plugin compiles `.css` files with
[cssnext](https://github.com/cssnext/cssnext).

This plugin is designed to compile a single, primary input file
into a single output file, with a tree of `@import`d dependencies. This
differs from [broccoli-cssnext](https://github.com/cssnext/broccoli-cssnext),
which compiles each `.css` file individually into a `.css` file and doesn't
support `@import`s or a single output file depending on multiple inputs.

This code is based heavily on
[broccoli-less-single](https://github.com/gabrielgrant/broccoli-less-single)

## Installation

```bash
npm install --save-dev broccoli-cssnext-single
```

## Usage

```js
var compileCssnext = require('broccoli-cssnext-single');

var outputTree = compileCssnext(inputTrees, inputFile, outputFile, options)
```

* **`inputTrees`**: An array of trees that act as the include paths for
  cssnext. If you have a single tree, pass `[tree]`.

* **`inputFile`**: Relative path of the main `.css` file to compile. This
  file must exist in one of the `inputTrees`.

* **`outputFile`**: Relative path of the output CSS file.

* **`options`**: A hash of options for cssnext.

### Example

```js
var appCss = compileCssnext(sourceTrees, 'myapp/app.css', 'assets/app.css')
```

### `@import`-Example

```css
/* file: sub.css */
h1 {
  font-size: 200em;
}

/* =================== */

/* file: app.css */
@import "sub";

html, body {
  margin: 20px;
}
```

[npm]: https://www.npmjs.org/package/broccoli-cssnext-single
[npm-badge]: https://img.shields.io/npm/v/broccoli-cssnext-single.svg?style=flat-square
[travis]: https://travis-ci.org/topaxi/broccoli-cssnext-single
[travis-badge]: https://img.shields.io/travis/topaxi/broccoli-cssnext-single.svg?branch=master&style=flat-square
