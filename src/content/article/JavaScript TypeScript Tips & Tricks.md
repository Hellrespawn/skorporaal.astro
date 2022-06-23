---
title: "JavaScript & TypeScript Tips & Tricks"
date: 2021-12-19
setup: |
  import { getUrl } from "@s:post";
  import * as html from "./HTML CSS Tips & Tricks.md";
  import * as jsTs from "./JavaScript TypeScript Tips & Tricks.md";

  const htmlUrl = getUrl(html);
  const jsTsUrl = getUrl(jsTs);
---

Tips & Tricks Index:

- <a href={htmlUrl}>HTML & CSS</a>
- <a href={jsTsUrl}>JS & TS</a>

## `tsconfig.json` settings

These all go under `"compilerOptions"`.

### `resolveJsonModule`

Allows importing the contents of JSON files as if they were modules. Will probably require you to set...

### `esInterop`

TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules, by default. There are several issues with this, which are solved by settings this to true.

### `downlevelIteration`

This enables a slightly slower but more accurate transpilation of modern iteration methods (e.g. `for/of`-loops, array spread, argument spread) to earlier version of ECMAScript.

## Code

### Falsy Values

The of values that are considered false in a boolean context can be found [here](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).

Notably, it does not include the empty array `[]` or empty object `{}`, which is a common misunderstanding for people coming from, say, Python.

### Default imports don't have a fixed name

Conventionally, one uses the same name as the export when using a default import (and your IDE usually does this automatically), but this is not required.

```ts
// File 1
export default function addOne(n: number): number {
  return n + 1;
}

// File 2
import increment from "File1";

console.log(increment(2));
// Prints '3'
```

### `type` imports

You can import something as a `type` only with the following syntax:

```ts
import { type FeedItem } from "@s:feed/feedItem";

let items: FeedItem[] = []; // This is fine
let item = new FeedItem(); // TypeScript shows an error message:
// 'FeedItem' cannot be used as a value because it was imported using 'import type'
```

### Convert recalcitrant collections to arrays

Some annoying data structures, like `HTMLCollectionOf` don't like being converted to arrays with modern syntax like the spread operator (`[...elems]`). For these occasions, `Array.from(elems)` will usually work.

### `function` vs. arrow functions

```ts
const object = {
  counter: 0,

  // Normal method, `this` is bound to `object`.
  add: function(n: number): void {
    this.counter += n;
  },

  // Shorthand for normal method,  `this` is bound to `object`.
  increment() {
    this.counter++;
  }

  // Arrow function, `this` is *not* bound to `object`, but is the same as in
  // the enclosing scope.
  decrement: () => this.counter--
}
```
