# match.flow

[![travis][travis.icon]][travis.url]
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]

[Elm][] archiceture introduced `update : (message, state) => state`, [Redux][] reducers became standard in JS, but unlike Elm JS lacks pattern matching and [flow][]'s [disjoint union][] refinements via `switch` statements require ton of boilerplate. This library attempts to provide a better solution via poor man's pattern matching for flow projects.

## Usage

```js
// @flow
import match from "match.flow"

const counter = match({
  increment(_, n: number): number {
    return n + 1
  },
  decrement(_, n: number): number {
    return n - 1
  }
})

counter({ increment: true }, 5) //? 6
counter({ decrement: true }, 5) //? 4
counter({}, 5) //?
```

Probably the most compelling feature of this library is how it handlers error cases:

```js
counter({ plus: 4 }, 3)
```

Above line would cause flow to report error below, meaning you'll catch error before your code is ever run:

```
Error: Readme.js:4
                           v
  4: const counter = match({
  5:   increment(_, n: number): number {
  6:     return n + 1
...:
 11: })
     ^ object literal. This type is incompatible with the expected param type of
 11:   matcher: Matcher<model, message>
                ^^^^^^^^^^^^^^^^^^^^^^^ object type. See: src/match.js:11
  Property `plus` is incompatible:
     11:   matcher: Matcher<model, message>
                    ^^^^^^^^^^^^^^^^^^^^^^^ property `plus`. Property not found in. See: src/match.js:11
                               v
      4: const counter = match({
      5:   increment(_, n: number): number {
      6:     return n + 1
    ...:
     11: })
         ^ object literal


Found 1 error
```

Fixing that code is as simple as providing `plus` case:

```js
const counter = match({
  increment(_, n: number): number {
    return n + 1
  },
  decrement(_, n: number): number {
    return n - 1
  },
  plus(param: number, n: number): number {
    return n + param
  }
})

counter({ plus: 4 }, 3) //? 7
```

You could also combine multiple operations into single message although **execution order** is not guaranteed:

```js
counter({ plus: 4, decrement: true }, 2) //? 5
```

## Install

    npm install match.flow

[travis.icon]: https://travis-ci.org/Gozala/match.flow.svg?branch=master
[travis.url]: https://travis-ci.org/Gozala/match.flow
[version.icon]: https://img.shields.io/npm/v/match.flow.svg
[downloads.icon]: https://img.shields.io/npm/dm/match.flow.svg
[package.url]: https://npmjs.org/package/match.flow
[downloads.image]: https://img.shields.io/npm/dm/match.flow.svg
[downloads.url]: https://npmjs.org/package/match.flow
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[elm]: http://elm-lang.org/
[redux]: https://redux.js.org/
[flow]: https://flow.org/
[disjoint union]: https://flow.org/en/docs/types/unions/#toc-disjoint-unions
