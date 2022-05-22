---
title: 'HTML & CSS Tips & Tricks'
date: 2021-12-19
---

Tips & Tricks Index:

- [JS/TS](@./JavaScript TypeScript Tips & Tricks.md)
- [HTML/CSS](@./HTML CSS Tips & Tricks.md)

## `<template>`

Templates are useful elements that allow you to embed a structure in an HTML file without having it rendered.

```html
<template id="commentTemplate">
  <h1 class="postTitle">Placeholder title</h1>
  <div class="postBody">Placeholder body</div>
</template>
```

```ts
const template = document.getElementById('commentTemplate');

for (const post of posts) {
  const element = fillTemplate(post, template.content.cloneNode(true));
  document.body.append(element);
}
```
