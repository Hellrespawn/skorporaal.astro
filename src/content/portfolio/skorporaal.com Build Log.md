---
title: "Build Log: skorporaal.com"
date: 2022-07-14
updated: 2022-07-14
---

Constantly updating the article really downplays the process of figuring out these technologies, so I'm starting a build log here, so I can remember what I was actually doing.

## Earlier

### Stay hydrated... but not always

One challenge I ran into was passing class instances across the build-time Astro/run-time Vue boundary. I was passing the `MarkdownInstance`s returned by `Astro.glob` as a property of a `Post` class, but passing this as a prop to an Astro component hydrated with `client:load` or `client:only` doesn't work. As far as I can tell, the prototype of the object gets reset to `Object`.

```astro
---
// This won't work.

const feedItems = (await Astro.glob<Frontmatter>("../content/**/*.md")).map(
  (mdInstance) => new FeedItem(mdInstance)
);
---

<Feed client:load feedItems={feedItems} />
```

The (unexpectedly simple) solution is to pass the `MarkdownInstance`s directly to the hydrated component, and then transform them there.

```astro
---
// index.page
// This works!

const instances = await Astro.glob<Frontmatter>("../content/**/*.md");
---

<Feed client:load instances={instances} />
```

```vue
<script setup lang="ts">
// Feed.vue
const { instances } = defineProps<{
  instances: MarkdownInstance<Frontmatter>[];
}>();

const feedItems = instance.map((instance) => new FeedItem(instance));
</script>
```

## 2022-07-14

### localStorage, finally

After a lot of mucking about, it turns out that the problem was `client:load`.

When using `client:load`, Astro renders the component to HTML/CSS so it can be loaded immediately and hydrates it afterwards, which causes lots of strange and hard-to-debug behavior. Replacing it by `client:only="vue"` means that the entire page is rendered dynamically in the browser only.

Before, `localStorage` (and `window` in general) was only accessible in Vue's `onMounted`-hook, whereas the expectation is that it should simply be accessible in `<script setup>`. As described above, Astro wanted to pre-render the page, which led to it trying to access `localStorage` outside of the browser, which, of course, doesn't work.

This had the same implication for `FeedItem`'s handling of the title.

The difference in client directives is described [here](https://docs.astro.build/en/reference/directives-reference/#client-directives).
