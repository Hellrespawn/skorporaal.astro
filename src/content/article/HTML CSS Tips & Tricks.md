---
title: 'HTML & CSS Tips & Tricks'
date: 2021-12-19
---

## Anchor tags `<a>`

Besides `href`, `<a>` has some more interesting attributes.

### `target`

The browsing context in which to display the URL. The default is `target="_self"`, which opens it in the current tab/window.

Use `target="_blank"` for a new browsing context, e.g. a new tab/window.

### `rel`

Denotes the relationship of the link to the site.

- `rel="nofollow"` - Indicates that the linked document is not endorsed by the author of this one.

- `rel="noopener"` - Instructs the browser to open the link without granting the new browsing context access to the document that opened it.

- `rel="noreferrer"` - Prevents the browser, when navigating to another page, to send any information via the `Referrer:` HTTP header.

## `<lang>`

`<lang>` tags can be used on elements to increase accessibility.

## `<script>`

Any `<script>` tag that doesn't include the `defer` attribute, will block loading for the rest of the page until it's finished. This is useful for dark mode, to avoid FOUC.

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
